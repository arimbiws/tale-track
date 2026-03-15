"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions/auth-action";

export default function SignupPage() {
  const router = useRouter();

  const handleRegister = async (formData: FormData) => {
    const res = await registerUser(formData);
    if (res.error) {
      toast.error(res.error);
    } else if (res.success) {
      toast.success("Akun berhasil dibuat! Silakan login.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="text-3xl bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">📚</span>
              <span className="font-heading text-2xl font-bold text-text tracking-tight">TaleTrack</span>
            </Link>
            <h2 className="text-2xl font-bold text-text mb-2">Mulai Petualanganmu</h2>
            <p className="text-sm text-gray-500">Buat akun untuk melacak bacaan pertamamu.</p>
          </div>

          <form action={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-secondary transition-colors shadow-lg shadow-primary/30 mt-4">
              Buat Akun
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
