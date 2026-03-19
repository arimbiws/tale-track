"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { loginUser, googleSignInAction } from "@/app/actions/auth-action";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Loader2 } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/shelves";
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setIsPending(true);
    const res = await loginUser(formData);

    if (res?.error) {
      toast.error(res.error);
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignInAction(callbackUrl);
  };

  return (
    <div className="p-8 sm:p-10 relative z-10">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-3 group">
          <img src="/logo/taletrack-logo.png" alt="TaleTrack Logo" className="h-15 w-auto mx-auto group-hover:scale-105 transition-transform" />
        </Link>
        <h2 className="text-2xl font-heading font-bold text-text mb-2">Welcome Back</h2>
        <p className="text-sm text-text/60">Continue your reading journey.</p>
      </div>

      <form action={handleLogin} className="space-y-5">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div>
          <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-1.5">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-background text-sm font-medium text-text"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-bold text-text/60 uppercase tracking-wider">Password</label>
            <Link href="/forgot-password" className="text-xs text-primary hover:text-secondary hover:underline font-semibold transition-colors">
              Forgot Password?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-background text-sm font-medium text-text"
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg mt-4 flex justify-center items-center gap-2
          ${isPending ? "bg-primary/70 text-white cursor-wait shadow-none" : "bg-primary text-white hover:bg-secondary shadow-primary/30"}`}
        >
          {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          {isPending ? "Processing..." : "Sign In"}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-xs text-text/40 font-bold uppercase tracking-wider">Or continue with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <form action={handleGoogleSignIn}>
        <button type="submit" className="w-full mt-6 bg-white border border-gray-200 text-text py-3.5 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 shadow-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.02 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-text/60">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary font-bold hover:text-secondary hover:underline transition-colors">
          Sign up here
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
        <Suspense
          fallback={
            <div className="p-10 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
            </div>
          }
        >
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
