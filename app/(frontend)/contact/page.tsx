"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Mail, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulasi pengiriman pesan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi jeda network (1.5 detik)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Menampilkan notifikasi sukses dan mereset form
    toast.success("Message sent successfully! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-28 pt-34 md:pt-42">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary block"></span>
              Get In Touch
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
              Let's Connect <br /> & Share.
            </h1>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">Have book recommendations, feature questions, or just want to say hi? The TaleTrack team is always happy to hear from you.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-text text-lg">Headquarters</h4>
                  <p className="text-gray-500 mt-1 leading-relaxed">
                    Jl. Sunset Road No. 88, Kuta, <br /> Bali, Indonesia 80361
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-text text-lg">Email Support</h4>
                  <a href="mailto:hello@taletrack.com" className="text-gray-500 mt-1 hover:text-primary transition-colors">
                    hello@taletrack.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full -z-10 blur-3xl"></div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold text-text/60 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background text-sm font-medium text-text transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-text/60 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      className="border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background text-sm font-medium text-text transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-bold text-text/60 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="How to use the tracking feature..."
                    className="border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background text-sm font-medium text-text transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-text/60 uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    className="border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background text-sm font-medium text-text resize-none transition-all"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-secondary transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
