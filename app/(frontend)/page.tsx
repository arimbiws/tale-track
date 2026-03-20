import Link from "next/link";
import { searchBooks } from "@/lib/google-books";
import { BookOpen, Library, Compass, ArrowRight, Quote, ChevronDown } from "lucide-react";
import Image from "next/image";

export default async function LandingPage() {
  const { books: carouselBooks } = await searchBooks("booktok OR bookstagram bestseller", 1, 12);

  return (
    <main className="min-h-screen">
      <section className="relative h-screen min-h-150 flex items-center justify-center bg-[url('/images/bg-hero.jpg')] bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-semibold tracking-wider mb-4 animate-fade-in-up">Track your tales, connect your pages</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-xl leading-tight">
            Build Your Own <br className="block md:hidden" />
            Digital Library
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-10 max-w-xs sm:max-w-2xl mx-auto font-light text-gray-200 leading-relaxed drop-shadow-md">
            Log your reading journey, organize your dream bookshelves, and discover your next favorite story in one beautiful space.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-base md:text-lg font-bold hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(var(--primary-rgb),0.6)] group"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-text mb-4">Everything You Need as a Reader</h2>
          <p className="text-gray-500 max-w-sm md:max-w-xl mx-auto">A simple yet powerful system to help you stay consistent and enjoy reading more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[
            {
              title: "Smart Tracker",
              desc: "Log your daily pages, track reading streaks, and stay motivated to hit your yearly reading goals.",
              icon: <BookOpen className="w-8 h-8 text-primary" />,
            },
            {
              title: "Custom Shelves",
              desc: "Curate personalized collections. Group books by genre, mood, favorites, or 'Did Not Finish'.",
              icon: <Library className="w-8 h-8 text-primary" />,
            },
            {
              title: "Endless Discovery",
              desc: "Search millions of titles from global databases and find recommendations just for you.",
              icon: <Compass className="w-8 h-8 text-primary" />,
            },
          ].map((uvp, i) => (
            <div key={i} className="p-8 md:p-10 rounded-4xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group justify-center items-center flex flex-col">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">{uvp.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-text">{uvp.title}</h3>
              <p className="text-gray-500 leading-relaxed">{uvp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="md:max-w-5xl mx-auto px-4 sm:px-6 pb-20 md:pb-32">
        <div className="bg-linear-to-br from-primary/5 to-accent/10 rounded-[3rem] p-10 md:p-20 relative overflow-hidden text-center border border-primary/10 shadow-inner">
          <Quote className="absolute top-8 left-8 md:top-12 md:left-12 w-24 h-24 text-primary opacity-10" />

          <div className="relative z-10">
            <blockquote className="max-w-3xl mx-auto">
              <cite className="text-xl sm:text-2xl md:text-4xl font-serif text-text leading-tight md:leading-snug">“Reading lets us live in someone else's shoes. Literature builds bridges; it makes our world larger, not smaller.”</cite>
              <footer className="mt-8 flex items-center justify-center gap-4">
                <div className="w-10 h-0.5 bg-primary/30"></div>
                <p className="font-bold text-text uppercase tracking-widest text-sm">R.F. Kuang, Yellowface</p>
                <div className="w-10 h-0.5 bg-primary/30"></div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-text text-background rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-xl">
            <span className="text-background/60 font-bold tracking-widest uppercase text-xs mb-2 block">Trending Now</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Community Favorites</h2>
            <p className="text-background/80 text-sm md:text-base">Swipe through the most talked-about books making waves across the internet right now.</p>
          </div>
          <Link href="/explore" className="group flex items-center gap-2 text-background hover:text-primary transition-colors font-semibold border-b border-background/30 hover:border-primary pb-1">
            Explore Full Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex w-full overflow-x-auto gap-6 px-6 md:px-12 pb-8 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden">
          {carouselBooks?.map((book: any, i: number) => (
            <div key={i} className="w-32 md:w-44 shrink-0 group cursor-pointer snap-start">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border border-white/10 aspect-2/3 mb-4 bg-gray-800">
                <Image src={book.cover_url || "/images/img-placeholder.jpeg"} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <span className="text-white text-xs font-bold bg-primary/90 px-3 py-1.5 rounded-full backdrop-blur-sm">View Details</span>
                </div>
              </div>
              <h4 className="text-sm md:text-base font-bold truncate text-white">{book.title}</h4>
              <p className="text-xs text-background/60 truncate mt-1">{book.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-square bg-[url('/images/bookshelf.jpg')] bg-cover bg-center rounded-2xl shadow-2xl relative z-10"></div>
          <div className="absolute top-10 -left-10 w-full h-full bg-primary/10 rounded-[3rem] -z-10"></div>
        </div>

        <div className="w-full md:w-1/2">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Simple Process</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-10 text-text leading-tight">Start Building Your Perfect Library</h2>

          <div className="space-y-8">
            {[
              { title: "Find Your Books", desc: "Search through millions of global titles instantly and add them to your account." },
              { title: "Create Custom Shelves", desc: "Organize your collection by genre, reading status, or your personal vibe." },
              { title: "Track Your Progress", desc: "Update your daily pages and watch your reading stats grow over time." },
            ].map((step, index) => (
              <div key={index} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="bg-white border border-primary/20 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  {index !== 2 && <div className="w-0.5 h-full bg-primary/10 mt-3 rounded-full"></div>}
                </div>
                <div className="pb-8">
                  <h4 className="font-bold text-xl mb-2 text-text group-hover:text-primary transition-colors">{step.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-text">Any Questions?</h2>
            <p className="text-gray-500">Everything you need to know about TaleTrack.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is TaleTrack completely free?",
                a: "Yes! Core features such as discovering books, creating unlimited custom shelves, and tracking your reading progress are 100% free to use.",
              },
              {
                q: "Where does the book data come from?",
                a: "We integrate directly with the Google Books API. This gives you access to a massive, continuously updated global database of literature.",
              },
              {
                q: "Can I review books here?",
                a: "Currently, TaleTrack focuses on tracking and organizing. However, comprehensive review and community rating systems are in our roadmap for future updates!",
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm group cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                <summary className="font-bold flex justify-between items-center text-lg text-text list-none">
                  {faq.q}
                  <span className="bg-primary/10 p-2 rounded-full text-primary group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <p className="mt-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-6 animate-fade-in-up">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
