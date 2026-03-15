// app/(frontend)/explore/loading.tsx
import { Search } from "lucide-react";

export default function ExploreLoading() {
  return (
    <section className="min-h-screen pb-28 pt-34 md:pt-42">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 animate-pulse">
          <div className="h-10 md:h-12 w-3/4 max-w-md mx-auto bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 w-1/2 max-w-sm mx-auto bg-gray-200 rounded-md"></div>
        </div>

        <div className="max-w-2xl mx-auto mb-8 flex gap-2 sm:gap-4 animate-pulse">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 h-[58px]"></div>
          <div className="w-[100px] bg-gray-200 rounded-xl h-[58px]"></div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-6 mb-8 justify-start md:justify-center animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full shrink-0"></div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col animate-pulse">
              <div className="relative overflow-hidden rounded-md mb-3 aspect-[2/3] bg-gray-200"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded-md mb-4 mt-1"></div>
              <div className="h-9 w-full bg-gray-100 rounded-lg mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
