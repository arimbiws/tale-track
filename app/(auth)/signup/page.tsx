"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerUser, googleSignInAction } from "@/app/actions/auth-action";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);

  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validateForm = (name: string, email: string, password: string) => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email address";
    if (!password || password.length < 8) newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validationErrors = validateForm(name, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsPending(true);
    setErrors({});
    const res = await registerUser(formData);

    if (res?.error) {
      toast.error(res.error);
      setIsPending(false);
    } else if (res?.success) {
      toast.success("Account created successfully! Please sign in.");
      router.push("/login");
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGooglePending(true);
    await googleSignInAction("/shelves");
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-3 group">
              <img src="/logo/logo-taletrack.png" alt="TaleTrack Logo" className="h-15 w-auto mx-auto group-hover:scale-105 transition-transform" />
            </Link>
            <h2 className="text-2xl font-heading font-bold text-text mb-2">Start Your Adventure</h2>
            <p className="text-sm text-text/60">Create an account to track your first read.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all bg-background text-sm font-medium 
                  ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-600" : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-text"} 
                  ${isPending || isGooglePending ? "opacity-60 cursor-not-allowed" : ""}`}
                disabled={isPending || isGooglePending}
                onChange={() => clearError("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in slide-in-from-top-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all bg-background text-sm font-medium 
                  ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-600" : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-text"} 
                  ${isPending || isGooglePending ? "opacity-60 cursor-not-allowed" : ""}`}
                disabled={isPending || isGooglePending}
                onChange={() => clearError("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in slide-in-from-top-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all bg-background text-sm font-medium 
                  ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-600" : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-text"} 
                  ${isPending || isGooglePending ? "opacity-60 cursor-not-allowed" : ""}`}
                disabled={isPending || isGooglePending}
                onChange={() => clearError("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-in slide-in-from-top-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || isGooglePending}
              className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg mt-6 flex justify-center items-center gap-2
              ${isPending ? "bg-primary/70 text-white cursor-wait shadow-none" : isGooglePending ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none" : "bg-primary text-white hover:bg-secondary shadow-primary/30"}`}
            >
              {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-text/40 font-bold uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <form action={handleGoogleSignUp}>
            <button
              type="submit"
              disabled={isPending || isGooglePending}
              className={`w-full mt-6 bg-white border border-gray-200 text-text py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-sm
              ${isGooglePending ? "opacity-70 cursor-wait bg-gray-50" : "hover:bg-gray-50 hover:border-gray-300"}`}
            >
              {isGooglePending ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.02 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              {isGooglePending ? "Redirecting to Google..." : "Sign up with Google"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-text/60">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:text-secondary hover:underline transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
