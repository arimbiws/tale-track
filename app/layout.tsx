import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-text",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "TaleTrack",
  description: "Track your tales, connect your pages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-primary/25 text-text`}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "",
            style: {
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: "semi-bold",
              borderRadius: "12px",
              background: "#fff",
              color: "#333",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
          }}
        />{" "}
        {children}
      </body>
    </html>
  );
}
