# 📚 TaleTrack - Digital Library & Reading Tracker

TaleTrack adalah aplikasi pelacak bacaan dan perpustakaan digital modern yang dibangun menggunakan **Next.js 15**, **React**, dan **Tailwind CSS**. Aplikasi ini memungkinkan pengguna untuk mengeksplorasi buku-buku terbaru, menyimpan buku ke dalam rak kustom, dan melacak progres membaca mereka secara real-time.

## ✨ Fitur Utama

- **Eksplorasi Buku Tanpa Batas:** Pencarian buku terintegrasi langsung dengan _Google Books API_.
- **Filter Pintar & Pagination:** Cari berdasarkan _keyword_, genre, atau temukan buku _trending_ (Booktok/Bookstagram) dengan sistem navigasi halaman.
- **Manajemen Rak Kustom (Shelves):** Buat rak tak terbatas (misal: "Favorit", "Fiksi Ilmiah", "Sedang Dibaca").
- **Reading Tracker:** Lacak status bacaan (_Want to Read_, _Reading_, _Finished_) beserta _progress bar_ persentase halaman.
- **Desain UI/UX Modern:** Animasi mulus, desain responsif, _glassmorphism navbar_, dan interaksi berbasis _Modal_ (tanpa _reload_ halaman berkat Next.js Server Actions).

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** PostgreSQL (atau MySQL) via [Prisma ORM](https://www.prisma.io/)
- **External API:** [Google Books API](https://developers.google.com/books)

## 🚀 Cara Menjalankan Proyek Secara Lokal

### 1. Prasyarat

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) dan NPM/Yarn.

### 2. Kloning Repositori

\`\`\`bash
git clone https://github.com/username-anda/taletrack.git
cd taletrack
\`\`\`

### 3. Instalasi Dependensi

\`\`\`bash
npm install

# atau

yarn install
\`\`\`

### 4. Konfigurasi Environment Variables

Buat file `.env` di direktori _root_ dan sesuaikan nilainya:
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/taletrack"
GOOGLE_BOOKS_API_KEY="AIzaSyYourGoogleBooksAPIKeyHere"
\`\`\`

### 5. Migrasi Database

Jalankan perintah Prisma untuk menyinkronkan skema ke database Anda:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`
_(Opsional: Anda bisa menggunakan `npx prisma studio` untuk melihat/mengisi data dummy user)._

### 6. Jalankan Development Server

\`\`\`bash
npm run dev
\`\`\`
Aplikasi sekarang dapat diakses di [http://localhost:3000](http://localhost:3000).

---

Dibuat dengan ❤️ untuk para pencinta buku.
