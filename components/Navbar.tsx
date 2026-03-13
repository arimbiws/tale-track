"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/actions/auth-action";

export default function Navbar({ user }: { user?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  const navBackgroundClass = isHome ? (isScrolled ? "bg-primary/50 backdrop-blur-sm shadow-lg my-4 h-20" : "bg-background/30 backdrop-blur-sm my-4 h-20") : "bg-primary/70 backdrop-blur-sm shadow-lg my-4 h-20";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 transition-all duration-300">
        <div className={`max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between rounded-full transition-all duration-500 ease-in-out ${navBackgroundClass}`}>
          <Link href="/" className="font-heading font-bold text-primary shrink-0">
            <img src="/logo/taletrack-logo.png" alt="Logo Tale Track" className="h-10 md:h-12 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8 font-semibold text-lg transition-all duration-300 text-background">
            <Link href="/" className="hover:text-background hover:border-b-2 hover:pb-1 transition-all duration-100 ">
              Home
            </Link>
            <Link href="/explore" className="hover:text-background hover:border-b-2 hover:pb-1 transition-all duration-100 ">
              Explore
            </Link>
            <Link href="/shelves" className="hover:text-background hover:border-b-2 hover:pb-1 transition-all duration-100 ">
              Bookshelves
            </Link>
            <Link href="/contact" className="hover:text-background hover:border-b-2 hover:pb-1 transition-all duration-100 ">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-5 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-background shadow-lg transition-all hover:scale-105 ${isScrolled ? "bg-primary" : "bg-background/90 text-primary"}`}
                >
                  {user.name?.charAt(0).toUpperCase()}{" "}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-background rounded-2xl shadow-xl py-2 border border-gray-100 flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 text-left">
                      <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors text-left">
                      Pengaturan Profil
                    </Link>
                    <button onClick={() => logoutUser()} className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left">
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className={`font-semibold transition-all duration-100 hover:border-b-2 hover:pb-1 ${isScrolled ? "text-background" : "text-background"}`}>
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all duration-300 ${isScrolled ? "bg-background text-primary hover:text-background hover:bg-primary" : "bg-primary text-background hover:bg-background hover:text-primary shadow-primary/20"}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {!isDrawerOpen && (
            <button className={`md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 transition-colors ${isScrolled ? "text-background" : "text-background"}`} onClick={() => setIsDrawerOpen(true)}>
              <span className="block w-6 h-0.5 bg-background"></span>
              <span className="block w-6 h-0.5 bg-background"></span>
              <span className="block w-6 h-0.5 bg-background"></span>
            </button>
          )}
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={closeDrawer}></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background/70 backdrop-blur-sm shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-24 border-b border-primary/30">
          <span className="font-heading font-bold text-primary text-2xl tracking-wider">Menu</span>
          <button onClick={closeDrawer} className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors focus:outline-none" aria-label="Close Menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col font-semibold text-lg text-secondary">
          <Link href="/" onClick={closeDrawer} className="hover:text-background hover:bg-primary px-6 py-3 transition">
            Home
          </Link>
          <Link href="/explore" onClick={closeDrawer} className="hover:text-background hover:bg-primary px-6 py-3 transition">
            Explore
          </Link>
          <Link href="/shelves" onClick={closeDrawer} className="hover:text-background hover:bg-primary px-6 py-3 transition">
            Bookshelves
          </Link>
          <Link href="/contact" onClick={closeDrawer} className="hover:text-background hover:bg-primary px-6 py-3 transition">
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-4 mt-auto p-6 border-t border-gray-100">
          {user ? (
            <>
              <div className="mb-2">
                <p className="font-bold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Link href="/profile" onClick={closeDrawer} className="text-center font-bold text-secondary hover:text-background border-2 border-secondary py-2 rounded-xl hover:bg-secondary transition">
                Profil Saya
              </Link>
              <button
                onClick={() => {
                  closeDrawer();
                  logoutUser();
                }}
                className="text-center font-bold text-danger hover:text-background py-2 rounded-xl shadow-lg border-2 border-danger hover:bg-danger transition"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeDrawer} className="text-center font-bold text-secondary hover:text-background border-2 border-primary py-2 rounded-xl hover:bg-secondary transition">
                Login
              </Link>
              <Link href="/signup" onClick={closeDrawer} className="text-center font-bold bg-primary text-background py-2 rounded-xl shadow-lg hover:bg-secondary transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
