// components/Footer.tsx
import Link from "next/link";
import { Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/90 backdrop-blur-sm shadow-lg rounded-t-4xl pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div>
            <Link href="/" className="shrink-0 inline-block mb-3 md:mb-6">
              <img src="/logo/taletrack-logo.png" alt="Logo Tale Track" className="h-15 md:h-20 w-auto object-contain" />
            </Link>
            <p className="text-background max-w-lg mb-6 leading-relaxed text-sm md:text-base">Katalog digital pribadi Anda. Pantau halaman yang dibaca, kelola rak buku impian, dan temukan cerita tak terlupakan selanjutnya.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:text-primary hover:bg-background transition-colors">
                <span className="font-medium">
                  <Twitter />
                </span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:text-primary hover:bg-background transition-colors">
                <span className="font-medium">
                  <Instagram />
                </span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:text-primary hover:bg-background transition-colors">
                <span className="font-medium">
                  <Facebook />
                </span>
              </a>
            </div>
          </div>

          <div className="flex gap-24 md:gap-16 md:justify-center sm:mt-4">
            <div>
              <h4 className="font-bold text-background mb-5 tracking-wider">Navigasi</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-background hover:text-text transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="text-background hover:text-text transition-colors">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/shelves" className="text-background hover:text-text transition-colors">
                    Bookshelves
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-background hover:text-text transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-background mb-5 tracking-wider">Explore Books</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-background hover:text-text transition-colors">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-background hover:text-text transition-colors">
                    Fiction
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-background hover:text-text transition-colors">
                    Romance
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-background hover:text-text transition-colors">
                    Fantasy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-background/30 pt-5 text-center gap-4 tracking-wider">
          <p className="text-background text-sm font-light">TaleTrack © {currentYear} | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
