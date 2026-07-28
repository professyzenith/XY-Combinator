# XY Combinator

> Premium AI-powered video conferencing platform. HD video, end-to-end encrypted, zero setup.

## Overview

XY Combinator is a modern video meetings platform built for teams who care about quality and security. Join in under 2 seconds — no plugins, no downloads required.

**Core features:**
- 1080p HD video with adaptive bitrate
- 256-bit AES end-to-end encryption
- Zero-knowledge architecture
- Real-time AI noise removal
- Persistent meeting chat
- Screen sharing & file sharing
- Works in all modern browsers

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Animation** — Framer Motion + GSAP
- **Styling** — Vanilla CSS with design tokens
- **Fonts** — Outfit, Inter (Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # React components
├── styles/           # Global CSS & design system tokens
├── utils/            # Animation utilities (GSAP, canvas particles)
└── public/           # Static assets
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/register` | Sign up |
| `/login` | Sign in |
| `/join` | Join a meeting by code |
| `/dashboard` | User dashboard |
| `/room/[roomId]` | Active meeting room |

## Scripts

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

## License

MIT
