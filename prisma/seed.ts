import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // <-- Import bcrypt

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai seeding...");

  // Hapus data lama
  await prisma.shelfItem.deleteMany();
  await prisma.shelf.deleteMany();
  await prisma.book.deleteMany();
  await prisma.profile.deleteMany();

  // 1. Buat User Dummy dengan Password
  const hashedPassword = await bcrypt.hash("password123", 10); // <-- Enkripsi password "password123"

  const user = await prisma.profile.create({
    data: {
      email: "user@taletrack.com",
      name: "TaleTrack Explorer",
      password: hashedPassword, // <-- Simpan password yang sudah di-hash
    },
  });

  // 2. Buat Rak Dummy
  const shelfFavorit = await prisma.shelf.create({
    data: { user_id: user.id, name: "Favorit Sepanjang Masa" },
  });

  const shelfTarget = await prisma.shelf.create({
    data: { user_id: user.id, name: "Target Baca 2026" },
  });

  // 3. Tarik Buku Viral/Trending dari Google Books API
  console.log("Mengambil buku trending dari API...");
  const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=5");
  const data = await res.json();
  const apiBooks = data.items || [];

  if (apiBooks.length >= 3) {
    // Simpan 3 buku pertama ke database kita
    const savedBooks = [];
    for (let i = 0; i < 3; i++) {
      const b = apiBooks[i];
      const book = await prisma.book.create({
        data: {
          id: b.id,
          title: b.volumeInfo.title || "Untitled",
          author: b.volumeInfo.authors ? b.volumeInfo.authors[0] : "Unknown",
          cover_url: b.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || "",
          total_pages: b.volumeInfo.pageCount || 300,
        },
      });
      savedBooks.push(book);
    }

    // 4. Masukkan ke rak
    await prisma.shelfItem.create({
      data: {
        shelf_id: shelfFavorit.id,
        book_id: savedBooks[0].id,
        status: "FINISHED",
        // Tambahkan || 0 di sini
        pages_read: savedBooks[0].total_pages || 0,
      },
    });
    await prisma.shelfItem.create({
      data: { shelf_id: shelfTarget.id, book_id: savedBooks[1].id, status: "TO_READ", pages_read: 0 },
    });
    await prisma.shelfItem.create({
      data: { shelf_id: shelfTarget.id, book_id: savedBooks[2].id, status: "READING", pages_read: 50 },
    });
  }

  console.log("Seeding selesai! Database telah diisi dengan data API.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
