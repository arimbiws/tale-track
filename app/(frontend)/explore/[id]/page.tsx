// app/(frontend)/explore/[id]/page.tsx
import { getBookDetails } from "@/lib/google-books";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = await getBookDetails(resolvedParams.id);

  if (!book) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="text-2xl font-bold">Buku tidak ditemukan</h1>
        <Link href="/explore" className="text-primary hover:underline mt-4 inline-block">
          Kembali ke Eksplorasi
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen pb-16 px-4 pt-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Cover Buku */}
          <div className="w-full md:w-1/3 shrink-0">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative">
              {book.cover_url ? <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Cover</div>}
            </div>
          </div>

          {/* Info Buku */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-2 leading-tight">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{book.author}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Halaman</p>
                  <p className="font-bold text-gray-800">{book.total_pages || "?"}</p>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <span className="text-xl">📅</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Tahun</p>
                  <p className="font-bold text-gray-800">{book.year || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Deskripsi</h3>
              <div className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: book.description }} />
            </div>

            {book.categories.length > 0 && (
              <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Kategori</p>
                <div className="flex flex-wrap gap-2">
                  {book.categories.map((cat: string) => (
                    <span key={cat} className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/10">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
