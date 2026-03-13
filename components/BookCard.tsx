"use client";

import { useState } from "react";
import { addBookToShelf } from "@/app/actions/book-action";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function BookCard({ book, shelves, isLoggedIn }: { book: any; shelves: any[]; isLoggedIn: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Tambahan state loading saat save
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <Link href={`/explore/${book.id}`} className="flex flex-col flex-grow cursor-pointer">
          <div className="relative overflow-hidden rounded-md mb-3 aspect-[2/3] bg-gray-100 shadow-inner">
            <img src={book.cover_url || "/images/img-placeholder.jpeg"} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          </div>
          <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">{book.title}</h3>
          <p className="text-xs text-gray-500 mb-4 mt-1 line-clamp-1">{book.author}</p>
        </Link>

        <button onClick={() => setIsModalOpen(true)} className="w-full mt-auto bg-primary/10 text-primary py-2 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition">
          + Simpan ke Rak
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative transform scale-100 animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-5 text-gray-400 hover:text-gray-800 text-xl font-bold">
              ✕
            </button>

            {!isLoggedIn ? (
              // TAMPILAN JIKA BELUM LOGIN
              <div className="text-center py-2 mt-4">
                <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <LockKeyhole />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Akses Terbatas</h3>
                <p className="text-sm text-gray-500 mb-8 px-2">
                  Anda harus masuk terlebih dahulu untuk menyimpan buku <span className="font-bold text-gray-700">"{book.title}"</span> ke rak Anda.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
                    }}
                    className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-secondary transition shadow-lg shadow-primary/30"
                  >
                    Login
                  </button>
                </div>
              </div>
            ) : (
              // TAMPILAN JIKA SUDAH LOGIN
              <div className="mt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Pilih Rak</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Mau simpan <span className="font-bold text-gray-700">"{book.title}"</span> di mana?
                </p>

                {shelves.length === 0 ? (
                  <div className="text-center bg-gray-50 p-6 rounded-2xl mb-4 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-4">Anda belum membuat rak buku satupun.</p>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        router.push("/shelves");
                      }}
                      className="bg-primary/10 text-primary px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition w-full"
                    >
                      Buat Rak Baru
                    </button>
                  </div>
                ) : (
                  <form
                    action={async (formData) => {
                      setIsSubmitting(true);
                      const res = await addBookToShelf(formData);
                      if (res?.error) {
                        toast.error(res.error);
                      } else {
                        toast.success("Buku berhasil disimpan!");
                        setIsModalOpen(false);
                      }
                      setIsSubmitting(false);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <input type="hidden" name="bookId" value={book.id} />
                    <input type="hidden" name="title" value={book.title} />
                    <input type="hidden" name="author" value={book.author} />
                    <input type="hidden" name="coverUrl" value={book.cover_url || ""} />
                    <input type="hidden" name="totalPages" value={book.total_pages || 0} />

                    <select name="shelfId" required className="w-full border border-gray-200 rounded-xl p-3.5 bg-gray-50 text-gray-700 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none">
                      <option value="">-- Pilih Rak Anda --</option>
                      {shelves.map((shelf) => (
                        <option key={shelf.id} value={shelf.id}>
                          {shelf.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg mt-2 flex justify-center items-center
                        ${isSubmitting ? "bg-primary/70 text-white cursor-wait" : "bg-primary text-white hover:bg-secondary shadow-primary/30"}`}
                    >
                      {isSubmitting ? "Menyimpan..." : "Simpan Buku"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
