"use client";

import { WifiOff, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <WifiOff className="w-10 h-10" />
      </div>

      <h1 className="font-heading text-4xl font-bold text-text mb-4">You are offline</h1>

      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">It seems you have lost your internet connection. Some features of TaleTrack are currently unavailable.</p>

      <div className="flex gap-4">
        <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors shadow-lg shadow-primary/30">
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>

        <Link href="/" className="flex items-center gap-2 bg-white text-text border border-gray-200 px-6 py-3 rounded-full font-bold hover:border-primary hover:text-primary transition-colors shadow-sm">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
