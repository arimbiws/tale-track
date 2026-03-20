"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createShelf, updateShelfItem, removeShelfItem, updateShelf, removeShelf } from "@/app/actions/book-action";
import { FilePlusCorner, LibraryBig, Loader2, Trash2, X, SquarePen, AlertTriangle, Search, BookOpen, CheckCircle2, BookText, Hash, SearchX } from "lucide-react";

export default function ShelvesClient({ initialShelves }: { initialShelves: any[] }) {
  const [isAddShelfModalOpen, setIsAddShelfModalOpen] = useState(false);
  const [isEditShelfModalOpen, setIsEditShelfModalOpen] = useState(false);
  const [shelfToEdit, setShelfToEdit] = useState<any>(null);
  const [shelfToDelete, setShelfToDelete] = useState<any>(null);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editPagesRead, setEditPagesRead] = useState(0);
  const [editStatus, setEditStatus] = useState("TO_READ");
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isShelfUpdating, setIsShelfUpdating] = useState(false);
  const [isDeletingShelf, setIsDeletingShelf] = useState(false);

  const analytics = initialShelves.reduce(
    (acc, shelf) => {
      shelf.items.forEach((item: any) => {
        if (item.status === "FINISHED") acc.finishedBooks++;
        if (item.status === "READING") acc.readingBooks++;
        if (item.status === "TO_READ") acc.tbrBooks++;
        acc.totalPagesRead += item.pages_read || 0;
      });
      return acc;
    },
    { tbrBooks: 0, finishedBooks: 0, readingBooks: 0, totalPagesRead: 0 },
  );

  const lowerQuery = searchQuery.toLowerCase();
  const filteredShelves = initialShelves
    .map((shelf) => {
      const isShelfMatch = shelf.name.toLowerCase().includes(lowerQuery);

      const matchingItems = shelf.items.filter((item: any) => {
        const titleMatch = item.book?.title?.toLowerCase().includes(lowerQuery) || false;
        const authorMatch = item.book?.author?.toLowerCase().includes(lowerQuery) || false;
        const descMatch = item.book?.description?.toLowerCase().includes(lowerQuery) || false;

        return titleMatch || authorMatch || descMatch;
      });

      return {
        ...shelf,
        items: searchQuery ? (isShelfMatch ? shelf.items : matchingItems) : shelf.items,
        isShelfMatch,
      };
    })
    .filter((shelf) => {
      return shelf.isShelfMatch || shelf.items.length > 0;
    });

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
      toast.success("Shelf created successfully!");
      setIsAddShelfModalOpen(false);
    }
  };

  const handleEditShelf = async (formData: FormData) => {
    setIsShelfUpdating(true);
    const res = await updateShelf(formData);
    if (res?.error) toast.error(res.error);
    else {
      toast.success("Shelf updated!");
      setIsEditShelfModalOpen(false);
      setShelfToEdit(null);
    }
    setIsShelfUpdating(false);
  };

  const handleDeleteShelf = async () => {
    setIsDeletingShelf(true);
    const formData = new FormData();
    formData.append("shelfId", shelfToDelete.id);
    const res = await removeShelf(formData);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Shelf deleted successfully.");
      setShelfToDelete(null);
      setIsEditShelfModalOpen(false);
    }
    setIsDeletingShelf(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(e.currentTarget);
    const res = await updateShelfItem(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Progress saved!");
      setSelectedItem(null);
    }
    setIsUpdating(false);
  };

  const handleDeleteItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDeleting(true);

    const formData = new FormData(e.currentTarget);
    const res = await removeShelfItem(formData);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Book removed from shelf.");
      setItemToDelete(null);
      setSelectedItem(null);
    }
    setIsDeleting(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-28 pt-34 md:pt-38">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">My Bookshelves</h1>
          <p className="text-sm md:text-base text-text/60">Track your reading progress and manage your digital library.</p>
        </div>
        <button
          onClick={() => setIsAddShelfModalOpen(true)}
          className="bg-primary text-white px-6 md:px-8 py-3 sm:py-4 rounded-full text-sm font-bold hover:bg-secondary transition shadow-lg shadow-primary/30 w-full sm:w-auto hover:scale-105 transform shrink-0"
        >
          + New Shelf
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center shrink-0">
            <Hash className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-xs text-text/60 font-bold uppercase tracking-wider mb-1">Pages Read</p>
            <p className="text-2xl font-bold text-text leading-none">{analytics.totalPagesRead}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-danger/10 rounded-2xl flex items-center justify-center shrink-0">
            <BookText className="w-6 h-6 text-danger" />
          </div>
          <div>
            <p className="text-xs text-text/60 font-bold uppercase tracking-wider mb-1">Want To Read</p>
            <p className="text-2xl font-bold text-text leading-none">{analytics.tbrBooks}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-info/10 rounded-2xl flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-info" />
          </div>
          <div>
            <p className="text-xs text-text/60 font-bold uppercase tracking-wider mb-1">Reading</p>
            <p className="text-2xl font-bold text-text leading-none">{analytics.readingBooks}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-xs text-text/60 font-bold uppercase tracking-wider mb-1">Finished</p>
            <p className="text-2xl font-bold text-text leading-none">{analytics.finishedBooks}</p>
          </div>
        </div>
      </div>

      {initialShelves.length > 0 && (
        <div className="relative max-w-full mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text/40" />
          </div>
          <input
            type="text"
            placeholder="Search by shelf, book title, author, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm text-sm font-medium text-text transition-all"
          />
        </div>
      )}

      <div className="space-y-16">
        {initialShelves.length === 0 ? (
          <div className="text-center py-28 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
              <LibraryBig className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-text">No Shelves Yet</h2>
            <p className="text-text/60 text-sm md:text-base max-w-sm mb-6">You haven’t created any shelves yet. Start by creating your first shelf to organize your books.</p>
            <button onClick={() => setIsAddShelfModalOpen(true)} className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:bg-secondary transition">
              Create First Shelf
            </button>
          </div>
        ) : filteredShelves.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <SearchX className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-text">No Results Found</h2>
            <p className="text-text/60">We couldn't find any shelves or books matching "{searchQuery}"</p>
          </div>
        ) : (
          filteredShelves.map((shelf) => (
            <div key={shelf.id} className="relative">
              <div className="flex justify-between items-end mb-6 px-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <LibraryBig className="h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-text mb-1">{shelf.name}</h2>
                      <button
                        onClick={() => {
                          setShelfToEdit(shelf);
                          setIsEditShelfModalOpen(true);
                        }}
                        className="text-text/40 hover:text-primary transition"
                        title="Edit Shelf"
                      >
                        <SquarePen className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-text/60">
                      {searchQuery && shelf.items.length !== initialShelves.find((s) => s.id === shelf.id)?.items.length ? `Showing ${shelf.items.length} matching books` : `${shelf.items.length} Books saved`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm relative z-10">
                <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
                  {shelf.items.length > 0 ? (
                    shelf.items.map((item: any) => {
                      const totalPages = item.book.total_pages || 1;
                      const pagesRead = item.pages_read || 0;
                      const progress = Math.min(Math.round((pagesRead / totalPages) * 100), 100);

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedItem({ ...item, currentShelfId: shelf.id, currentShelfName: shelf.name });
                            setEditPagesRead(item.pages_read || 0);
                            setEditStatus(item.status);
                          }}
                          className="min-w-[160px] max-w-[160px] sm:min-w-[180px] sm:max-w-[180px] group snap-start relative cursor-pointer"
                        >
                          <div className="aspect-[2/3] w-full mb-4 rounded-xl overflow-hidden bg-background shadow-[3px_3px_10px_rgba(0,0,0,0.1)] relative transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[5px_15px_20px_rgba(0,0,0,0.15)] border border-gray-200/50">
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/10 z-10"></div>
                            <img src={item.book.cover_url || "/images/no-cover.png"} alt={item.book.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 z-20">
                              <span
                                className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase shadow-sm ${item.status === "FINISHED" ? "bg-success text-white" : item.status === "READING" ? "bg-info text-white" : "bg-accent text-white"}`}
                              >
                                {item.status === "TO_READ" ? "WANT TO READ" : item.status}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-bold text-text text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">{item.book.title}</h3>
                          <p className="text-xs text-text/60 mt-1 mb-3 truncate">{item.book.author}</p>

                          {item.status !== "TO_READ" && (
                            <div className="w-full">
                              <div className="flex justify-between text-[10px] text-text/60 mb-1 font-bold">
                                <span>{progress}%</span>
                                <span>
                                  {pagesRead} / {totalPages} pgs
                                </span>
                              </div>
                              <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                                <div className={`h-2 rounded-full ${item.status === "FINISHED" ? "bg-success" : "bg-primary"}`} style={{ width: `${progress}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full py-16 flex flex-col items-center justify-center bg-background rounded-2xl border-2 border-dashed border-gray-200">
                      <span className="text-4xl mb-3 opacity-40">
                        <FilePlusCorner className="h-8 w-8 text-primary" />
                      </span>
                      <p className="text-text/60 font-medium text-sm text-center">This shelf is empty.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isAddShelfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsAddShelfModalOpen(false)} className="absolute top-4 right-5 text-text/40 hover:text-text">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-2 text-text">Create New Shelf</h3>
            <form action={handleCreateShelf} className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Shelf Name (e.g., 2026 Goals)"
                required
                className="border border-gray-200 rounded-xl p-3 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary text-text outline-none"
              />
              <textarea
                name="description"
                placeholder="Description (optional)..."
                className="border border-gray-200 rounded-xl p-3 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary text-text outline-none resize-none"
                rows={3}
              ></textarea>
              <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-secondary transition">
                Create Shelf
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditShelfModalOpen && shelfToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setIsEditShelfModalOpen(false);
                setShelfToEdit(null);
              }}
              className="absolute top-4 right-5 text-text/40 hover:text-text"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-2 text-text">Edit Shelf</h3>
            <form action={handleEditShelf} className="flex flex-col gap-4 mt-4">
              <input type="hidden" name="shelfId" value={shelfToEdit.id} />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text/60">Shelf Name</label>
                <input type="text" name="name" defaultValue={shelfToEdit.name} required className="border border-gray-200 rounded-xl p-3 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary text-text outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text/60">Description</label>
                <textarea
                  name="description"
                  defaultValue={shelfToEdit.description || ""}
                  className="border border-gray-200 rounded-xl p-3 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary text-text outline-none resize-none"
                  rows={3}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isShelfUpdating}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-secondary transition flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isShelfUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                {isShelfUpdating ? "Saving..." : "Save Changes"}
              </button>

              <button type="button" onClick={() => setShelfToDelete(shelfToEdit)} className="w-full text-danger/80 text-sm font-bold mt-2 hover:text-danger hover:underline transition">
                Delete Shelf
              </button>
            </form>
          </div>
        </div>
      )}

      {shelfToDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Delete Shelf?</h3>
            <p className="text-sm text-text/60 mb-2 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-text">"{shelfToDelete.name}"</span>?
            </p>
            <p className="text-xs text-danger/80 bg-danger/10 p-2 rounded-lg mb-6 font-semibold">All books inside this shelf will also be removed. This action cannot be undone.</p>

            <div className="flex gap-3">
              <button type="button" disabled={isDeletingShelf} onClick={() => setShelfToDelete(null)} className="flex-1 bg-background text-text py-3.5 rounded-xl font-bold hover:bg-gray-200 transition">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteShelf}
                disabled={isDeletingShelf}
                className="flex-1 bg-danger text-white py-3.5 rounded-xl font-bold shadow-lg shadow-danger/30 hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isDeletingShelf ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedItem && !itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-background px-6 pt-10 pb-6 border-b border-gray-100 flex gap-4 items-center">
              <div className="w-16 h-24 shrink-0 rounded-md overflow-hidden shadow-md border border-gray-200 bg-white">
                <img src={selectedItem.book.cover_url || "/images/no-cover.png"} alt="Cover" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text line-clamp-2 leading-tight tracking-wide">{selectedItem.book.title}</h3>
                <p className="text-sm text-text/60 mt-1">{selectedItem.book.author}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-200 text-text/40 hover:bg-primary/10 hover:text-primary shadow-sm transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 mt-4 p-6">
              <input type="hidden" name="itemId" value={selectedItem.id} />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text/60 uppercase tracking-wider">Shelf Location</label>
                <select
                  name="newShelfId"
                  defaultValue={selectedItem.currentShelfId}
                  className="border border-gray-200 rounded-xl p-3.5 bg-background text-sm font-semibold text-text focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]"
                >
                  <option value={selectedItem.currentShelfId}>{selectedItem.currentShelfName}</option>

                  {initialShelves
                    .filter((shelf) => shelf.id !== selectedItem.currentShelfId)
                    .map((shelf) => (
                      <option key={shelf.id} value={shelf.id}>
                        {shelf.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text/60 uppercase tracking-wider">Reading Status</label>
                  <select
                    name="status"
                    value={editStatus}
                    onChange={handleStatusChange}
                    className="border border-gray-200 rounded-xl p-3.5 bg-background text-sm font-semibold text-text focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]"
                  >
                    <option value="TO_READ">Want To Read</option>
                    <option value="READING">Reading</option>
                    <option value="FINISHED">Finished</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text/60 uppercase tracking-wider">Progress (Max: {selectedItem.book.total_pages})</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pagesRead"
                      value={editPagesRead}
                      onChange={(e) => setEditPagesRead(Number(e.target.value))}
                      max={selectedItem.book.total_pages}
                      className="w-full border border-gray-200 rounded-xl p-3.5 bg-background text-sm font-semibold text-text focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text/40">Pgs</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-2 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setItemToDelete(selectedItem)} className="w-1/3 bg-danger/10 text-danger py-3.5 rounded-xl font-bold hover:bg-danger/20 text-sm transition">
                  Remove
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-2/3 bg-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                >
                  {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <Trash2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Remove Book?</h3>
            <p className="text-sm text-text/60 mb-8 leading-relaxed">
              Book <span className="font-bold text-text">"{itemToDelete.book.title}"</span> will be permanently removed from this shelf.
            </p>

            <form onSubmit={handleDeleteItem} className="flex gap-3">
              <input type="hidden" name="itemId" value={itemToDelete.id} />
              <button type="button" disabled={isDeleting} onClick={() => setItemToDelete(null)} className="flex-1 bg-background text-text py-3.5 rounded-xl font-bold hover:bg-gray-200 transition">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isDeleting}
                className="flex-1 bg-danger text-white py-3.5 rounded-xl font-bold shadow-lg shadow-danger/30 hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes, Remove"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
