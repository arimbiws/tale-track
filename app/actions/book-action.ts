"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
export async function addBookToShelf(formData: FormData) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Anda harus login untuk menambahkan buku ke rak." };
  }

  const userId = session.user.id;

  const bookId = formData.get("bookId") as string;
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const coverUrl = formData.get("coverUrl") as string;
  const totalPages = parseInt(formData.get("totalPages") as string) || 0;
  const shelfId = formData.get("shelfId") as string;

  try {
    const shelf = await prisma.shelf.findUnique({
      where: { id: shelfId },
    });

    if (!shelf || shelf.user_id !== userId) {
      return { error: "Rak tidak ditemukan atau Anda tidak memiliki akses." };
    }

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
        user_id: session.user.id,
      },
    });
    revalidatePath("/shelves");
    return { success: true };
  } catch (error) {
    return { error: "Gagal membuat rak" };
  }
}

export async function updateShelfItem(formData: FormData) {
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

export async function updateShelf(formData: FormData) {
  const shelfId = formData.get("shelfId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  try {
    await prisma.shelf.update({
      where: { id: shelfId },
      data: { name, description },
    });
    revalidatePath("/shelves");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update shelf" };
  }
}

export async function removeShelf(formData: FormData) {
  const shelfId = formData.get("shelfId") as string;
  try {
    await prisma.shelf.delete({ where: { id: shelfId } });
    revalidatePath("/shelves");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete shelf" };
  }
}
