import Link from "next/link";
import { searchBooks } from "@/lib/google-books";

export default async function LandingPage() {
  const { books: carouselBooks } = await searchBooks("booktok OR bookstagram bestseller", 1, 12);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[url('/images/bg-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white pt-14">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-wide drop-shadow-md">Your Digital Library</h1>
          <p className="text-sm md:text-xl px-5 mb-10 max-w-xs md:max-w-3xl mx-auto font-light text-gray-200">Organize, track, and discover your next favorite book with TaleTrack.</p>
          <Link
            href="/explore"
            className="inline-block bg-primary text-white px-10 py-4 rounded-full text-base md:text-lg font-bold hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(81,154,102,0.8)]"
          >
            Explore More Books
          </Link>
        </div>
      </section>

      {/* UVP Section */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6 grid grid-cols-3 gap-3 sm:gap-5 md:gap-10">
        {[
          {
            title: "Smart Reading Tracker",
            desc: "Track every page you read in real-time and stay motivated to reach your daily reading goals.",
            icon: "📈",
          },
          {
            title: "Custom Bookshelves",
            desc: "Create personalized shelves based on genres, moods, or your yearly reading goals.",
            icon: "📂",
          },
          {
            title: "Discover New Books",
            desc: "Explore millions of books worldwide through a powerful and intelligent search system.",
            icon: "🔍",
          },
        ].map((uvp, i) => (
          <div key={i} className="p-3 md:p-8 rounded-3xl bg-white border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl md:text-5xl mb-6 bg-primary/10 w-20 h-20 mx-auto flex items-center justify-center rounded-2xl">{uvp.icon}</span>
            <h3 className="text-lg md:text-2xl font-bold mb-4 text-text">{uvp.title}</h3>
            <p className="text-gray-500 leading-relaxed hidden md:block">{uvp.desc}</p>
          </div>
        ))}
      </section>

      {/* QOTD */}
      <section className="md:max-w-5xl mx-auto px-4 sm:px-6 pb-16 md:pb-24">
        <div className="bg-primary/5 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden text-center border border-primary/10">
          <span className="absolute top-4 left-6 text-9xl text-primary opacity-10 font-serif leading-none">“</span>

          <div className="relative z-10">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-6 block"> Quote of the Day</span>
            <blockquote className="max-w-3xl mx-auto">
              <cite className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed"> “Reading lets us live in someone else's shoes. Literature builds bridges; it makes our world larger, not smaller.”</cite>
              <p className="font-bold text-text block text-lg mt-8">— R.F. Kuang, Yellowface</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-16 md:py-24 bg-text text-background">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
          <div>
            <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Discover Popular Books</h2>
            <p className="text-sm"> Swipe to discover books that readers are loving right now.</p>
          </div>
          <div className="text-end">
            <Link href="/explore" className="text-background hover:text-accent font-medium transition border-[0.5] border-background hover:border-accent rounded-md px-3 py-1 text-xs md:text-sm">
              View All &rarr;
            </Link>
          </div>
        </div>

        <div className="flex w-full overflow-x-auto gap-6 px-6 md:px-12 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden">
          {carouselBooks.map((book: any, i: number) => (
            <div key={i} className="w-25 md:w-37.5 shrink-0 group cursor-pointer snap-start">
              <div className="relative overflow-hidden rounded-xl shadow-2xl border border-gray-700 aspect-2/3">
                <img src={book.cover_url || "/images/img-placeholder.jpeg"} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                  <span className="text-white text-xs bg-primary px-1 sm:px-2 py-1 rounded">See More</span>
                </div>
              </div>
              <h4 className="text-sm font-bold truncate mt-4 mb-1.5">{book.title}</h4>
              <p className="text-xs text-gray-400 truncate">{book.author}</p>
              <p className="text-xs text-gray-400 truncate">{book.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 lg:gap-16">
        <div className="w-full md:w-1/2 h-100 aspect-square flex items-center justify-center">
          <div className="w-full h-full bg-[url('/images/bookshelf.jpg')] bg-cover bg-center rounded-4xl shadow-xl border-2 border-background/15"></div>
        </div>
        <div className="md:w-1/2">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block text-center md:text-start">How To Organize Your Shelves</span>
          <h2 className="font-heading text-2xl lg:text-4xl font-bold mb-8 text-text text-center md:text-start">Start Managing Your Reading</h2>
          <ul className="space-y-6">
            <li className="flex gap-3 md:gap-6 items-start">
              <span className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md">1</span>
              <div>
                <h4 className="font-bold text-base md:text-lg mb-1">Find Your Favorite Books</h4>
                <p className="text-gray-500 text-justify text-sm md:text-base">Search millions of books from the global database in seconds.</p>
              </div>
            </li>
            <li className="flex gap-3 md:gap-6 items-start">
              <span className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md">2</span>
              <div>
                <h4 className="font-bold text-base md:text-lg mb-1">Create Custom Shelves</h4>
                <p className="text-gray-500 text-justify text-sm md:text-base">Organize books by genre, mood, or your personal reading goals.</p>
              </div>
            </li>
            <li className="flex gap-3 md:gap-6 items-start">
              <span className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md">3</span>
              <div>
                <h4 className="font-bold text-base md:text-lg mb-1">Track Your Progress</h4>
                <p className="text-gray-500 text-justify text-sm md:text-base">Update the pages you read and watch your progress grow with clear completion percentages.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-text">Frequently Asked Questions</h2>
            <p className="text-gray-500">Quick answers to common questions.</p>
          </div>

          <div className="space-y-4">
            <details className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group cursor-pointer">
              <summary className="font-bold list-none flex justify-between items-center text-lg text-text">
                Is TaleTrack completely free?
                <span className="group-open:rotate-180 transition-transform duration-300 text-primary">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">Yes. Core features such as book discovery, unlimited shelves, and reading progress tracking are completely free to use.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group cursor-pointer">
              <summary className="font-bold list-none flex justify-between items-center text-lg text-text">
                Where does the book data come from?
                <span className="group-open:rotate-180 transition-all duration-300 text-primary">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                TaleTrack integrates directly with the Google Books API, providing access to millions of books from around the world with continuously updated information.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
