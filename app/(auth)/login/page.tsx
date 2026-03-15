"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { loginUser } from "@/app/actions/auth-action";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="text-3xl bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">📚</span>
              <span className="font-heading text-2xl font-bold text-text tracking-tight">TaleTrack</span>
            </Link>
            <h2 className="text-2xl font-bold text-text mb-2">Selamat Datang Kembali</h2>
            <p className="text-sm text-gray-500">Lanjutkan perjalanan membaca Anda.</p>
          </div>

          <form action={handleLogin} className="space-y-5">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline font-semibold">
                  Lupa Password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg mt-2 flex justify-center items-center gap-2
              ${isPending ? "bg-primary/70 text-white cursor-wait shadow-none" : "bg-primary text-white hover:bg-secondary shadow-primary/30"}`}
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {isPending ? "Memproses..." : "Masuk Sekarang"}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Atau</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          <button className="w-full mt-6 border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">Masuk dengan Google</button>

          <p className="text-center mt-8 text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
