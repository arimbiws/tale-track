<div align="center">
  <img src="public/logo/logo-taletrack.png" alt="TaleTrack Logo" height="100"/>

**Track your tales, connect your pages.**

A personal digital catalog to track your reading progress, manage your dream bookshelves, and discover your next unforgettable story.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

</div>

<br />

## Preview

<p align="center">
  <img src="public/screenshots/screenshot-home.png" alt="Home Preview" width="33%" />
  <img src="public/screenshots/screenshot-explore.png" alt="Explore Page Preview" width="33%" />
  <img src="public/screenshots/screenshot-shelves.png" alt="Shelves Page Preview" width="33%" />
</p>

## Features

- **Endless Discovery:** Search millions of titles from global databases via the Google Books API. Browse by trending books, authors, or your favorite genres.
- **Custom Bookshelves:** Curate personalized collections. Group books by genre, mood, favorites, or create your own custom categories.
- **Smart Reading Tracker:** Log your daily pages, track your reading progress with dynamic progress bars, and update book statuses (Want to Read, Reading, Finished).
- **Secure Authentication:** Seamless login/signup experience using Auth.js (NextAuth v5), including email password resets and secure session management.
- **PWA Ready (Offline Support):** Install TaleTrack on your mobile device as a Progressive Web App. Cached pages remain accessible even when you lose your internet connection.
- **Modern & Responsive UI:** A beautifully crafted, fully responsive design using Tailwind CSS with smooth animations and intuitive interactions.

## Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org/) (App Router, Turbopack)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icons)
- [Next PWA](https://github.com/ducanh2912/next-pwa) (Service Worker & Offline Support)

**Backend & Database:**

- [Prisma ORM](https://www.prisma.io/)
- [Supabase](https://supabase.com/) (PostgreSQL Database)
- [Auth.js / NextAuth v5](https://authjs.dev/) (Authentication)
- [Nodemailer](https://nodemailer.com/) (Password Reset Emails)

**External APIs:**

- [Google Books API](https://developers.google.com/books)

## Project Structure

Project Structure

```text
tale-track/
├── app/
│   ├── (frontend)/
│   │   ├── explore/
│   │   ├── shelves/
│   │   ├── contact/
│   │   └── page.tsx
│   ├── actions/
│   ├── api/
│   ├── ~offline/
│   ├── layout.tsx
│   └── globals.css
├── components/
├── lib/
├── public/
├── prisma/
├── middleware.ts
└── next.config.ts
```

## Future Improvements

- Community Book Reviews
- Reading Challenges
- Social Features

<hr/>

<div align="center">
<p>Made with ♡ by a reader, for readers.</p>
</div>
