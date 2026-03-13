"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // <-- Import auth dari konfigurasi Auth.js kita

export async function addBookToShelf(formData: FormData) {
  // 1. Cek sesi user yang sedang login secara real-time
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Anda harus login untuk menambahkan buku ke rak." };
  }

  // Ambil ID user dari sesi Auth.js
  const userId = session.user.id;

  // 2. Ambil data yang dikirim dari tombol
  const bookId = formData.get("bookId") as string;
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const coverUrl = formData.get("coverUrl") as string;
  const totalPages = parseInt(formData.get("totalPages") as string) || 0;
  const shelfId = formData.get("shelfId") as string;

  try {
    // 3. Pastikan rak tersebut benar-benar milik user yang sedang login
    const shelf = await prisma.shelf.findUnique({
      where: { id: shelfId },
    });

    if (!shelf || shelf.user_id !== userId) {
      return { error: "Rak tidak ditemukan atau Anda tidak memiliki akses." };
    }

    // 4. Simpan/Update data buku ke tabel Book
    await prisma.book.upsert({
      where: { id: bookId },
      update: {},
      create: {
        id: bookId,
        title: title,
        author: author,
        cover_url: coverUrl,
        total_pages: totalPages,
      },
    });

    // 5. Masukkan buku ke dalam Rak
    await prisma.shelfItem.create({
      data: {
        shelf_id: shelfId,
        book_id: bookId,
        status: "TO_READ",
      },
    });

    revalidatePath("/shelves");
    return { success: true };
  } catch (error) {
    console.error("Error menambahkan buku:", error);
    return { error: "Buku ini mungkin sudah ada di rak tersebut." };
  }
}

export async function createShelf(formData: FormData) {
  // 1. Cek sesi user
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Anda harus login untuk membuat rak." };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  try {
    await prisma.shelf.create({
      data: {
        name,
        description,
        user_id: session.user.id, // <-- Gunakan ID dari user yang sedang login
      },
    });
    revalidatePath("/shelves");
    return { success: true };
  } catch (error) {
    return { error: "Gagal membuat rak" };
  }
}

export async function updateShelfItem(formData: FormData) {
  // Opsional: Anda bisa tambahkan proteksi auth() di sini juga seperti fungsi di atas

  const itemId = formData.get("itemId") as string;
  const status = formData.get("status") as any;
  const pagesRead = parseInt(formData.get("pagesRead") as string) || 0;
  const newShelfId = formData.get("newShelfId") as string;

  try {
    await prisma.shelfItem.update({
      where: { id: itemId },
      data: {
        status,
        pages_read: pagesRead,
        shelf_id: newShelfId,
      },
    });
    revalidatePath("/shelves");
    return { success: true };
  } catch (error) {
    return { error: "Gagal memperbarui buku" };
  }
}

export async function removeShelfItem(formData: FormData) {
  // Opsional: Anda bisa tambahkan proteksi auth() di sini juga

  const itemId = formData.get("itemId") as string;
  try {
    await prisma.shelfItem.delete({
      where: { id: itemId },
    });
    revalidatePath("/shelves");
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus buku" };
  }
}
