"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required!" };
  }

  try {
    const existingUser = await prisma.profile.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email is already registered. Please sign in." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.profile.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to create account. Please try again." };
  }
}

export async function loginUser(formData: FormData) {
  const callbackUrl = (formData.get("callbackUrl") as string) || "/shelves";

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" };
        default:
          return { error: "An error occurred during sign in." };
      }
    }
    throw error;
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

export async function googleSignInAction(callbackUrl: string) {
  await signIn("google", { redirectTo: callbackUrl });
}

export async function forgotPasswordAction(email: string) {
  if (!email) return { error: "Email is required!" };

  try {
    const existingUser = await prisma.profile.findUnique({ where: { email } });

    if (!existingUser || !existingUser.password) {
      console.log("Email tidak ditemukan atau login via Google:", email);
      return { success: true };
    }

    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    await prisma.passwordResetToken.deleteMany({ where: { email } });
    await prisma.passwordResetToken.create({
      data: { email, token, expires },
    });

    console.log("Mencoba mengirim email ke:", email);
    await sendPasswordResetEmail(email, token);
    console.log("Email berhasil terkirim!");
    return { success: true };
  } catch (error) {
    console.error("ERROR SAAT FORGOT PASSWORD:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function resetPasswordAction(password: string, token: string) {
  if (!token || !password) return { error: "Missing required fields!" };

  try {
    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!existingToken) return { error: "Invalid token!" };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Token has expired!" };

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.profile.update({
      where: { email: existingToken.email },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong." };
  }
}
