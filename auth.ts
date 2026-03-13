import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Kita menggunakan strategi JWT karena kita memakai Credentials (Email & Password)
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // Arahkan ke halaman login kustom kita jika belum login
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Cari user berdasarkan email di database
        const user = await prisma.profile.findUnique({
          where: { email: credentials.email as string },
        });

        // Jika user tidak ada atau tidak punya password
        if (!user || !user.password) return null;

        // 2. Cocokkan password yang diketik dengan password di database
        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);

        // 3. Jika cocok, kembalikan data user (yang akan disimpan di session)
        if (passwordsMatch) {
          return { id: user.id, email: user.email, name: user.name };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // Memasukkan User ID ke dalam token dan session agar bisa diakses di komponen lain
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
