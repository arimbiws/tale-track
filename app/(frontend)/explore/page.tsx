import { searchBooks } from "@/lib/google-books";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import SearchForm from "@/components/SearchForm";
import { auth } from "@/auth";
import { Search } from "lucide-react";

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ q?: string; genre?: string; page?: string }> }) {
  const resolvedParams = await searchParams;

  const searchQuery = resolvedParams.q || "";
  const genre = resolvedParams.genre || "";
  const currentPage = Number(resolvedParams.page) || 1;

  let apiQuery = "";

  if (searchQuery) {
    apiQuery = searchQuery;
  } else if (genre) {
    apiQuery = `subject:${genre}`;
  } else {
    apiQuery = "booktok OR bookstagram bestseller";
  }

  const { books, totalItems } = await searchBooks(apiQuery, currentPage, 20);

  const session = await auth();
  const isLoggedIn = !!session?.user;

  const shelves = isLoggedIn && session?.user?.id ? await prisma.shelf.findMany({ where: { user_id: session.user.id } }) : [];

  const genres = ["Fiction", "Romance", "Fantasy", "Mystery", "History", "Science", "Business", "Poetry"];

  const totalPages = Math.min(Math.ceil(totalItems / 20), 50);

  return (
    <section className="max-w-7xl mx-auto px-4 pb-28 pt-34 md:pt-38">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-text">Explore Books</h1>
        <p className="text-gray-500">Search by title, author, or browse your favorite genres.</p>
      </div>

      <SearchForm initialQuery={searchQuery} />

      <div className="flex gap-3 overflow-x-auto pb-6 mb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden justify-start md:justify-center">
        <Link
          href="/explore"
          className={`px-5 py-2 rounded-full border text-sm font-semibold shrink-0 snap-start transition 
            ${!genre && !searchQuery ? "bg-primary text-white border-primary shadow-md" : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary shadow-sm"}`}
        >
          Trending
        </Link>

        {genres.map((g) => (
          <Link
            key={g}
            href={`/explore?genre=${g.toLowerCase()}`}
            className={`px-5 py-2 rounded-full border text-sm font-semibold shrink-0 snap-start transition 
              ${genre === g.toLowerCase() && !searchQuery ? "bg-primary text-white border-primary shadow-md" : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary shadow-sm"}`}
          >
            {g}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {books.length > 0 ? (
          books.map((book: any) => <BookCard key={book.id} book={book} shelves={shelves} isLoggedIn={isLoggedIn} />)
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-6xl mb-4 flex justify-center">
              <Search className="h-10 w-10 text-primary opacity-50" />
            </p>
            <h3 className="text-xl font-bold text-gray-800">No Books Found</h3>
            <p className="text-gray-500 mt-2">Try using a different keyword or author name.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && books.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-16">
          {currentPage > 1 ? (
            <Link
              href={`/explore?page=${currentPage - 1}${genre ? `&genre=${genre}` : ""}${searchQuery ? `&q=${searchQuery}` : ""}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:border-primary hover:text-primary shadow-sm transition"
            >
              &larr; Prev
            </Link>
          ) : (
            <button disabled className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-400 cursor-not-allowed">
              &larr; Prev
            </button>
          )}

          <span className="text-sm font-medium text-gray-600 px-4 py-2">
            Page <span className="font-bold text-primary">{currentPage}</span> of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/explore?page=${currentPage + 1}${genre ? `&genre=${genre}` : ""}${searchQuery ? `&q=${searchQuery}` : ""}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:border-primary hover:text-primary shadow-sm transition"
            >
              Next &rarr;
            </Link>
          ) : (
            <button disabled className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-400 cursor-not-allowed">
              Next &rarr;
            </button>
          )}
        </div>
      )}
    </section>
  );
}
