"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createShelf, updateShelfItem, removeShelfItem } from "@/app/actions/book-action";

export default function ShelvesClient({ initialShelves }: { initialShelves: any[] }) {
  const [isAddShelfModalOpen, setIsAddShelfModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editPagesRead, setEditPagesRead] = useState(0);
  const [editStatus, setEditStatus] = useState("TO_READ");
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const openEditModal = (item: any, shelfId: string) => {
    setSelectedItem({ ...item, currentShelfId: shelfId });
    setEditPagesRead(item.pages_read || 0);
    setEditStatus(item.status);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setEditStatus(newStatus);
    if (newStatus === "FINISHED" && selectedItem) {
      setEditPagesRead(selectedItem.book.total_pages || 100);
    }
  };

  const handleCreateShelf = async (formData: FormData) => {
    const res = await createShelf(formData);
    if (res?.error) toast.error(res.error);
    else {
      toast.success("Rak baru berhasil dibuat!");
      setIsAddShelfModalOpen(false);
    }
  };

  const handleUpdateItem = async (formData: FormData) => {
    const res = await updateShelfItem(formData);
    if (res?.error) toast.error(res.error);
    else {
      toast.success("Progres buku disimpan!");
      setSelectedItem(null);
    }
  };

  const handleDeleteItem = async (formData: FormData) => {
    const res = await removeShelfItem(formData);
    if (res?.error) toast.error(res.error);
    else {
      toast.success("Buku dihapus dari rak.");
      setItemToDelete(null);
      setSelectedItem(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 min-h-screen bg-gray-50/50">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-2">Koleksi Rak Buku</h1>
          <p className="text-gray-500">Lacak progres bacaan dan atur perpustakaan digital Anda.</p>
        </div>
        <button onClick={() => setIsAddShelfModalOpen(true)} className="bg-primary text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-secondary transition shadow-lg shadow-primary/30 w-full sm:w-auto hover:scale-105 transform">
          + Buat Rak Baru
        </button>
      </div>

      {/* DAFTAR RAK */}
      <div className="space-y-16">
        {initialShelves.length > 0 ? (
          initialShelves.map((shelf) => (
            <div key={shelf.id} className="relative">
              <div className="flex justify-between items-end mb-6 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📚</div>
                  <div>
                    <h2 className="text-2xl font-bold text-text">{shelf.name}</h2>
                    <p className="text-sm text-gray-500">{shelf.items.length} Buku tersimpan</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm relative z-10">
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
                  {shelf.items.length > 0 ? (
                    shelf.items.map((item: any) => {
                      const totalPages = item.book.total_pages || 1;
                      const pagesRead = item.pages_read || 0;
                      const progress = Math.min(Math.round((pagesRead / totalPages) * 100), 100);

                      return (
                        // Buku bisa diklik untuk membuka modal Edit
                        <div key={item.id} onClick={() => setSelectedItem({ ...item, currentShelfId: shelf.id })} className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] group snap-start relative cursor-pointer">
                          <div className="aspect-[2/3] w-full mb-4 rounded-r-xl rounded-l-md overflow-hidden bg-gray-200 shadow-[5px_5px_15px_rgba(0,0,0,0.15)] relative transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[5px_15px_20px_rgba(0,0,0,0.2)]">
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20 z-10"></div>
                            <img src={item.book.cover_url || "/images/no-cover.png"} alt={item.book.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 z-20">
                              <span
                                className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase shadow-sm ${item.status === "FINISHED" ? "bg-success text-white" : item.status === "READING" ? "bg-warning text-white" : "bg-gray-800 text-white"}`}
                              >
                                {item.status === "TO_READ" ? "WANT TO READ" : item.status}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-bold text-text text-sm line-clamp-2">{item.book.title}</h3>
                          <p className="text-xs text-gray-400 mb-3">{item.book.author}</p>

                          {item.status !== "TO_READ" && (
                            <div className="w-full">
                              <div className="flex justify-between text-[10px] text-gray-500 mb-1 font-semibold">
                                <span>{progress}%</span>
                                <span>
                                  {pagesRead} / {totalPages} hlm
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div className={`h-1.5 rounded-full ${item.status === "FINISHED" ? "bg-success" : "bg-primary"}`} style={{ width: `${progress}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <span className="text-4xl mb-3 opacity-50">📭</span>
                      <p className="text-gray-400 font-medium text-sm mb-3 text-center">Rak masih kosong melompong.</p>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-3xl border-t border-gray-300"></div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-6xl mb-6 block">📚</span>
            <h2 className="text-2xl font-bold mb-2">Belum Ada Rak</h2>
            <p className="text-gray-500 text-lg font-medium">Buat rak pertamamu di atas.</p>
          </div>
        )}
      </div>

      {/* MODAL 1: TAMBAH RAK */}
      {isAddShelfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsAddShelfModalOpen(false)} className="absolute top-4 right-5 text-gray-400">
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">Buat Rak Baru</h3>
            <form action={handleCreateShelf} className="flex flex-col gap-4 mt-4">
              <input type="text" name="name" placeholder="Nama Rak" required className="border rounded-xl p-3 bg-gray-50" />
              <textarea name="description" placeholder="Deskripsi..." className="border rounded-xl p-3 bg-gray-50"></textarea>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                Buat Rak
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT BUKU */}
      {selectedItem && !itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-5 text-gray-400">
              ✕
            </button>
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{selectedItem.book.title}</h3>

            <form action={handleUpdateItem} className="flex flex-col gap-4 mt-4">
              <input type="hidden" name="itemId" value={selectedItem.id} />

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Pindah ke Rak</label>
                <select name="newShelfId" defaultValue={selectedItem.currentShelfId} className="border rounded-xl p-3 bg-gray-50 text-sm">
                  {initialShelves.map((shelf) => (
                    <option key={shelf.id} value={shelf.id}>
                      {shelf.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Status Membaca</label>
                <select name="status" value={editStatus} onChange={handleStatusChange} className="border rounded-xl p-3 bg-gray-50 text-sm">
                  <option value="TO_READ">Want to Read</option>
                  <option value="READING">Reading</option>
                  <option value="FINISHED">Finished</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Progres Halaman (Total: {selectedItem.book.total_pages})</label>
                <input type="number" name="pagesRead" value={editPagesRead} onChange={(e) => setEditPagesRead(Number(e.target.value))} max={selectedItem.book.total_pages} className="border rounded-xl p-3 bg-gray-50 text-sm" />
              </div>

              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setItemToDelete(selectedItem)} className="w-1/3 border border-red-500 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 text-sm">
                  Hapus
                </button>
                <button type="submit" className="w-2/3 bg-primary text-white py-3 rounded-xl font-bold text-sm">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: KONFIRMASI HAPUS */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
            <h3 className="text-xl font-bold mb-2">Hapus Buku?</h3>
            <p className="text-sm text-gray-500 mb-6">Buku "{itemToDelete.book.title}" akan dihapus secara permanen dari rak ini.</p>

            <form action={handleDeleteItem} className="flex gap-3">
              <input type="hidden" name="itemId" value={itemToDelete.id} />
              <button type="button" onClick={() => setItemToDelete(null)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold">
                Batal
              </button>
              <button type="submit" className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600">
                Ya, Hapus
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
