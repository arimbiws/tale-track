"use server";

import { signIn } from "@/auth";
import { signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "Semua kolom wajib diisi!" };
  }

  try {
    const existingUser = await prisma.profile.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email sudah terdaftar. Silakan login." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.profile.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    return { error: "Gagal membuat akun. Coba lagi." };
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
          return { error: "Email atau password salah!" };
        default:
          return { error: "Terjadi kesalahan saat login." };
      }
    }
    throw error;
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}
