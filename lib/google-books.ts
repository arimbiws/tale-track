const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query: string, page: number = 1, limit: number = 20) {
  if (!API_KEY) {
    throw new Error("Google Books API key is missing");
  }

  const startIndex = (page - 1) * limit;

  const finalQuery = query.trim() || "booktok";

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(finalQuery)}&key=${API_KEY}&startIndex=${startIndex}&maxResults=${limit}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();

  return {
    books:
      data.items?.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") ?? "Unknown Author",
        year: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.substring(0, 4) : null,
        cover_url: item.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") ?? null,
        total_pages: item.volumeInfo.pageCount ?? 0,
      })) || [],
    totalItems: data.totalItems || 0,
  };
}

export async function getBookDetails(bookId: string) {
  if (!API_KEY) {
    throw new Error("Google Books API key is missing");
  }

  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    return null; // Buku tidak ditemukan
  }

  const item = await res.json();

  return {
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.join(", ") ?? "Unknown Author",
    year: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.substring(0, 4) : null,
    cover_url: item.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://")?.replace("&zoom=1", "&zoom=2") ?? null, // Zoom=2 untuk gambar lebih besar
    total_pages: item.volumeInfo.pageCount ?? 0,
    description: item.volumeInfo.description ?? "Tidak ada deskripsi yang tersedia untuk buku ini.",
    categories: item.volumeInfo.categories ?? [],
    publisher: item.volumeInfo.publisher ?? "Tidak diketahui",
  };
}
