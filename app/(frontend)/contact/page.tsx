import { Mail, MessageCircle, BookOpen, HelpCircle, Instagram, Twitter } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-28 pt-32 md:pt-40 min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block animate-fade-in-up">Get in Touch</span>
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
          Let's Connect & <span className="text-primary italic">Share.</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">Have book recommendations, experiencing technical issues, or just want to talk about your favorite plot twist? We're always here to listen.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
        <a href="mailto:hello@taletrack.com" className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-text mb-2">Email Support</h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">For technical help or account issues, drop us an email. We usually reply within 24 hours.</p>
          <span className="font-medium text-primary mt-auto group-hover:underline">hello@taletrack.com</span>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
            <Instagram className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-text mb-2">Instagram</h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">Join our visual community. Tag us in your aesthetic reading spots and aesthetic bookshelves.</p>
          <span className="font-medium text-accent mt-auto group-hover:underline">@taletrackapp</span>
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
            <Twitter className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-text mb-2">Twitter</h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">Let's rant about cliffhangers and fictional characters together. Join the conversation.</p>
          <span className="font-medium text-blue-500 mt-auto group-hover:underline">@taletrackapp</span>
        </a>
      </div>

      <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-[3rem] p-8 md:p-12 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-text">Need immediate help?</h3>
          </div>
          <p className="text-gray-600">Before reaching out, your question might have already been answered. Check out our detailed FAQ section to learn how to manage your shelves, track progress, and discover books.</p>
        </div>

        <div className="relative z-10 shrink-0">
          <a href="/#faq" className="inline-flex items-center gap-2 bg-white text-text border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md">
            <BookOpen className="w-5 h-5" />
            Read Our FAQ
          </a>
        </div>
      </div>
    </section>
  );
}
