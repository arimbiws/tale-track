"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPasswordAction } from "@/app/actions/auth-action";
export default function ForgotPasswordPage() {
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const res = await forgotPasswordAction(email);
    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      setIsSubmitted(true);
      toast.success("Reset link sent successfully!");
    }

    setIsPending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
        <div className="p-8 sm:p-10 relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-3 group">
              <img src="/logo/logo-taletrack.png" alt="TaleTrack Logo" className="h-15 w-auto mx-auto group-hover:scale-105 transition-transform" />
            </Link>
            <h2 className="text-2xl font-heading font-bold text-text mb-2">Reset Password</h2>
            {!isSubmitted && <p className="text-sm text-text/60">Enter your email address and we'll send you a link to reset your password.</p>}
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg mt-4 flex justify-center items-center gap-2
                ${isPending ? "bg-primary/70 text-white cursor-wait shadow-none" : "bg-primary text-white hover:bg-secondary shadow-primary/30"}`}
              >
                {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
                {isPending ? "Sending Link..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">Check your email</h3>
              <p className="text-sm text-text/60 mb-6">We have sent a password reset link to your email. Please check your inbox or spam folder.</p>
              <button onClick={() => setIsSubmitted(false)} className="text-sm text-primary font-bold hover:underline">
                Try another email
              </button>
            </div>
          )}

          <div className="mt-8">
            <Link href="/login" className="flex justify-center items-center gap-2 text-sm text-text/60 font-medium hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
