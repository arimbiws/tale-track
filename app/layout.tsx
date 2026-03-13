import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast"; // <-- IMPORT INI
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-text",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "TaleTrack",
  description: "Track your tales, connect your pages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-text`}>
        {/* Tempatkan Toaster di sini agar bisa dipanggil dari halaman manapun */}
        <Toaster position="bottom-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
