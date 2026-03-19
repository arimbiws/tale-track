"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { resetPasswordAction } from "@/app/actions/auth-action";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-2xl font-bold">!</span>
        </div>
        <h3 className="text-lg font-bold text-text mb-2">Invalid Request</h3>
        <p className="text-sm text-text/60 mb-6">Missing reset token. Please request a new password reset link.</p>
        <Link href="/forgot-password" className="text-primary font-bold hover:underline">
          Request new link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const res = await resetPasswordAction(password, token);

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      setIsSuccess(true);
      toast.success("Password updated successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }

    setIsPending(false);
  };

  if (isSuccess) {
    return (
      <div className="text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-text mb-2">Password Reset Successful</h3>
        <p className="text-sm text-text/60 mb-6">Your password has been securely updated. Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-3 group">
          <img src="/logo/taletrack-logo.png" alt="TaleTrack Logo" className="h-15 w-auto mx-auto group-hover:scale-105 transition-transform" />
        </Link>
        <h2 className="text-2xl font-heading font-bold text-text mb-2">Create New Password</h2>
        <p className="text-sm text-text/60">Enter your new strong password below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-1.5">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Minimum 8 characters"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-background text-sm font-medium text-text"
            required
            minLength={8}
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
          {isPending ? "Updating Password..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
        <div className="p-8 sm:p-10 relative z-10">
          <Suspense
            fallback={
              <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
