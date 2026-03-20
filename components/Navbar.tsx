"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/actions/auth-action";
import { LogOut, Loader2 } from "lucide-react";

export default function Navbar({ user }: { user?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setIsLogoutModalOpen(false);
    setIsLoggingOut(false);
    setIsDrawerOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutUser();
  };

  const navBackgroundClass = isHome ? (isScrolled ? "bg-primary/50 backdrop-blur-sm shadow-lg my-4 h-20" : "bg-background/30 backdrop-blur-sm my-4 h-20") : "bg-primary/70 backdrop-blur-sm shadow-lg my-4 h-20";

  const getDesktopLinkClass = (path: string) => {
    const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
    return `transition-all duration-100 hover:text-background hover:border-b-2 hover:pb-1 ${isActive ? "text-background border-b-2 pb-1" : ""}`;
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
    return `px-6 py-3 transition ${isActive ? "bg-primary text-background" : "hover:text-background hover:bg-primary"}`;
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 transition-all duration-300">
        <div className={`max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between rounded-full transition-all duration-500 ease-in-out ${navBackgroundClass}`}>
          <Link href="/" className="font-heading font-bold text-primary shrink-0">
            <img src="/logo/logo-taletrack.png" alt="Logo Tale Track" className="h-10 md:h-12 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8 font-semibold text-lg transition-all duration-300 text-background">
            <Link href="/" className={getDesktopLinkClass("/")}>
              Home
            </Link>
            <Link href="/explore" className={getDesktopLinkClass("/explore")}>
              Explore
            </Link>
            <Link href="/shelves" className={getDesktopLinkClass("/shelves")}>
              Bookshelves
            </Link>
            <Link href="/contact" className={getDesktopLinkClass("/contact")}>
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
                  {user.name?.charAt(0).toUpperCase()}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-background rounded-2xl shadow-xl py-2 border border-gray-100 flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 text-left">
                      <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors text-left">
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="px-4 py-2 text-sm font-semibold text-danger hover:bg-danger/10 transition-colors text-left flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="font-semibold transition-all duration-100 hover:border-b-2 hover:pb-1 text-background">
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
            <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 transition-colors text-background" onClick={() => setIsDrawerOpen(true)}>
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
          <button onClick={closeDrawer} className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col font-semibold text-lg text-secondary">
          <Link href="/" onClick={closeDrawer} className={getMobileLinkClass("/")}>
            Home
          </Link>
          <Link href="/explore" onClick={closeDrawer} className={getMobileLinkClass("/explore")}>
            Explore
          </Link>
          <Link href="/shelves" onClick={closeDrawer} className={getMobileLinkClass("/shelves")}>
            Bookshelves
          </Link>
          <Link href="/contact" onClick={closeDrawer} className={getMobileLinkClass("/contact")}>
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
                My Profile
              </Link>
              <button
                onClick={() => {
                  closeDrawer();
                  setIsLogoutModalOpen(true);
                }}
                className="text-center font-bold text-danger hover:text-background py-2 rounded-xl shadow-lg border-2 border-danger hover:bg-danger transition"
              >
                Log Out
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

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-text/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <LogOut className="w-10 h-10 ml-1" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Log Out of Account?</h3>
            <p className="text-sm text-text/60 mb-8 leading-relaxed">You will need to log in again to access your bookshelves.</p>

            <div className="flex gap-3">
              <button type="button" disabled={isLoggingOut} onClick={() => setIsLogoutModalOpen(false)} className="flex-1 bg-background text-text py-3.5 rounded-xl font-bold hover:bg-gray-200 transition">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 bg-danger text-white py-3.5 rounded-xl font-bold shadow-lg shadow-danger/30 hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes, Log Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
