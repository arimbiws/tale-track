"use server";

import { signIn } from "@/auth";
import { signOut } from "@/auth"; // Pastikan import ini ada di atas jika belum
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

// --- ACTION UNTUK REGISTER ---
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "Semua kolom wajib diisi!" };
  }

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.profile.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email sudah terdaftar. Silakan login." };
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    await prisma.profile.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    return { error: "Gagal membuat akun. Coba lagi." };
  }
}

// --- ACTION UNTUK LOGIN ---
export async function loginUser(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/shelves", // Jika berhasil, arahkan ke halaman rak buku
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
    // Ingat: fungsi signIn NextAuth akan melempar error "NEXT_REDIRECT" jika berhasil.
    // Kita HARUS me-throw ulang error tersebut agar Next.js bisa memindahkan halaman.
    throw error;
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}
