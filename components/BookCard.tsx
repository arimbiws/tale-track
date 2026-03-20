"use client";

import { useState } from "react";
import { addBookToShelf } from "@/app/actions/book-action";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, LockKeyhole, Plus } from "lucide-react";
import Link from "next/link";

export default function BookCard({ book, shelves, isLoggedIn }: { book: any; shelves: any[]; isLoggedIn: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const handleSaveSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await addBookToShelf(formData);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Book saved successfully!");
      setIsModalOpen(false);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="bg-background p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <Link href={`/explore/${book.id}`} className="flex flex-col grow cursor-pointer">
          <div className="relative overflow-hidden rounded-md mb-3 aspect-2/3 bg-gray-100 shadow-inner">
            <img src={book.cover_url || "/images/img-placeholder.jpeg"} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          </div>
          <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">{book.title}</h3>
          <p className="text-xs text-gray-500 mb-4 mt-1 line-clamp-1">{book.author}</p>
        </Link>

        <button onClick={() => setIsModalOpen(true)} className="w-full mt-auto bg-primary/10 text-primary py-2 rounded-lg text-xs font-bold hover:bg-primary hover:text-background transition">
          + Add to Shelf
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-background rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative transform scale-100 animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-5 text-gray-400 hover:text-gray-800 text-xl font-bold">
              ✕
            </button>

            {!isLoggedIn ? (
              <div className="text-center py-2 mt-4">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <LockKeyhole />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
                <p className="text-sm text-gray-500 mb-8 px-2">
                  You need to be logged in to save <span className="font-bold text-gray-700">"{book.title}"</span> to your shelves.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
                    }}
                    className="flex-1 bg-primary text-background py-3 rounded-xl font-bold text-sm hover:bg-secondary transition shadow-lg shadow-primary/30"
                  >
                    Login
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Select a Shelf</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Where would you like to save <span className="font-bold text-gray-700">"{book.title}"</span>?
                </p>

                {shelves.length === 0 ? (
                  <div className="text-center bg-gray-50 p-6 rounded-2xl mb-4 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-4">You haven't created any shelves yet.</p>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        router.push("/shelves");
                      }}
                      className="bg-primary/10 text-primary px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary hover:text-background transition w-full"
                    >
                      Create New Shelf
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveSubmit} className="flex flex-col gap-4">
                    <input type="hidden" name="bookId" value={book.id} />
                    <input type="hidden" name="title" value={book.title} />
                    <input type="hidden" name="author" value={book.author} />
                    <input type="hidden" name="coverUrl" value={book.cover_url || ""} />
                    <input type="hidden" name="totalPages" value={book.total_pages || 0} />

                    <select
                      name="shelfId"
                      required
                      className="border border-gray-200 rounded-xl p-3.5 bg-gray-50 text-text/70 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-position-[right_1rem_center] bg-size-[1.2em_1.2em]"
                    >
                      <option value="">Choose a shelf</option>
                      {shelves.map((shelf) => (
                        <option className="text-text" key={shelf.id} value={shelf.id}>
                          {shelf.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg mt-2 flex justify-center items-center gap-2
                        ${isSubmitting ? "bg-primary/70 text-background cursor-wait shadow-none" : "bg-primary text-background hover:bg-secondary shadow-primary/30"}`}
                    >
                      {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                      {isSubmitting ? "Saving..." : "Save Book"}
                    </button>

                    <div className="text-center mt-2">
                      <p className="text-xs text-gray-500">
                        Don't have the right shelf?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsModalOpen(false);
                            router.push("/shelves");
                          }}
                          className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Create New Shelf
                        </button>
                      </p>
                    </div>
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
