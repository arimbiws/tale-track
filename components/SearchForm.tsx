"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

export default function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const url = `/explore?q=${encodeURIComponent(inputValue.trim())}`;

    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <form className="max-w-2xl mx-auto mb-8 flex gap-2 sm:gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="q"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Judul, penulis, atau ISBN..."
        className="flex-1 border bg-background border-primary/30 rounded-xl px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm w-full text-text"
      />
      <button
        type="submit"
        disabled={isPending || !inputValue.trim()}
        className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition shadow-lg shrink-0 flex items-center justify-center min-w-[100px] gap-2
          ${isPending || !inputValue.trim() ? "bg-primary text-background cursor-not-allowed shadow-none" : "bg-primary text-background hover:bg-secondary hover:shadow-primary/30"}`}
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Search className="h-4 w-4 hidden sm:block" /> Cari
          </>
        )}
      </button>
    </form>
  );
}
