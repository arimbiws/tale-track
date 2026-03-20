import Link from "next/link";
import { Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/90 backdrop-blur-sm shadow-lg rounded-t-[2.5rem] pt-16 pb-8 -mt-7 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-5 lg:col-span-6">
            <Link href="/" className="shrink-0 inline-block mb-4">
              <img src="/logo/logo-taletrack.png" alt="Logo Tale Track" className="h-12 md:h-16 w-auto object-contain" />
            </Link>
            <p className="text-background/90 max-w-md mb-8 leading-relaxed text-sm md:text-base">Your personal digital catalog. Track your reading progress, manage your dream bookshelves, and discover your next unforgettable story.</p>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center text-background hover:text-primary hover:bg-white hover:scale-110 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center text-background hover:text-primary hover:bg-white hover:scale-110 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center text-background hover:text-primary hover:bg-white hover:scale-110 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-background mb-5 tracking-widest uppercase text-xs">Navigation</h4>
              <ul className="space-y-3 text-sm md:text-base">
                <li>
                  <Link href="/" className="text-background/70 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="text-background/70 hover:text-white transition-colors">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/shelves" className="text-background/70 hover:text-white transition-colors">
                    Bookshelves
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-background/70 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-background mb-5 tracking-widest uppercase text-xs">Explore Books</h4>
              <ul className="space-y-3 text-sm md:text-base">
                <li>
                  <Link href="/explore" className="text-background/70 hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link href="/explore?genre=fiction" className="text-background/70 hover:text-white transition-colors">
                    Fiction
                  </Link>
                </li>
                <li>
                  <Link href="/explore?genre=romance" className="text-background/70 hover:text-white transition-colors">
                    Romance
                  </Link>
                </li>
                <li>
                  <Link href="/explore?genre=fantasy" className="text-background/70 hover:text-white transition-colors">
                    Fantasy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hidden sm:block">
              <h4 className="font-bold text-background mb-5 tracking-widest uppercase text-xs">Others</h4>
              <ul className="space-y-3 text-sm md:text-base">
                <li>
                  <Link href="/explore?genre=mystery" className="text-background/70 hover:text-white transition-colors">
                    Mystery
                  </Link>
                </li>
                <li>
                  <Link href="/explore?genre=history" className="text-background/70 hover:text-white transition-colors">
                    History
                  </Link>
                </li>
                <li>
                  <Link href="/explore?genre=science" className="text-background/70 hover:text-white transition-colors">
                    Science
                  </Link>
                </li>
                <li>
                  <Link href="/explore?genre=business" className="text-background/70 hover:text-white transition-colors">
                    Business
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-background/70 text-sm font-light">&copy; {currentYear} TaleTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
