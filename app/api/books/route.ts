// app/api/books/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, title, author, cover_url, shelf_id } = body;

    // 1. Simpan/Update buku di tabel Book (Upsert)
    // Jika buku sudah ada (berdasarkan ID Google), abaikan. Jika belum, buat baru.
    const book = await prisma.book.upsert({
      where: { id: id },
      update: {},
      create: {
        id: id,
        title: title,
        author: author,
        cover_url: cover_url,
      },
    });

    // 2. Tambahkan buku ke dalam Shelf tertentu (shelfItem)
    const shelfItem = await prisma.shelfItem.create({
      data: {
        shelf_id: shelf_id,
        book_id: id,
        status: "TO_READ",
      },
    });

    return NextResponse.json({ success: true, shelfItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
