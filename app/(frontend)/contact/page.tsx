export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Kolom Informasi Kiri */}
        <div>
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
            Mari Bertukar <br /> Cerita.
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">Punya saran buku, pertanyaan seputar fitur, atau sekadar ingin menyapa? Tim TaleTrack selalu senang mendengar dari Anda.</p>

          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl shrink-0">📍</div>
              <div>
                <h4 className="font-bold text-text text-lg">Markas Utama</h4>
                <p className="text-gray-500 mt-1">Jl. Sunset Road No. 88, Kuta, Bali, Indonesia 80361</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl shrink-0">✉️</div>
              <div>
                <h4 className="font-bold text-text text-lg">Email Terpusat</h4>
                <p className="text-gray-500 mt-1">hello@taletrack.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Form Kanan */}
        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold text-text">
                  Nama Lengkap
                </label>
                <input type="text" id="name" placeholder="John Doe" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-text">
                  Alamat Email
                </label>
                <input type="email" id="email" placeholder="john@example.com" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50" required />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-bold text-text">
                Subjek
              </label>
              <input type="text" id="subject" placeholder="Bagaimana cara menggunakan..." className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50" required />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-bold text-text">
                Pesan Anda
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tuliskan pesan Anda di sini..."
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 resize-none"
                required
              ></textarea>
            </div>

            <button type="button" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/30">
              Kirim Pesan
            </button>
          </form>

          {/* Elemen Dekoratif */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent rounded-full -z-10"></div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary/20 rounded-full -z-10 blur-xl"></div>
        </div>
      </div>
    </div>
  );
}
