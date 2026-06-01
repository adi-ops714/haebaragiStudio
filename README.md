# Haebaragi Studio

A premium, cinematic portfolio website for **Haebaragi Studio** — a web design agency specialising in bespoke digital storefronts for restaurants, gyms, and medical clinics.

Built with React 19, Vite 6, Tailwind CSS 4, Motion/React, and TypeScript.

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the environment example and fill in your values:
   ```
   cp .env.example .env.local
   ```
   Set `VITE_FORMSPREE_ENDPOINT` to your [Formspree](https://formspree.io) form URL so the contact form works.

3. Start the dev server:
   ```
   npm run dev
   ```
   The site runs at `http://localhost:3000`.

## Build for production

```
npm run build
```

Output goes to `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** for bundling
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **Motion/React** for animations
- **Lucide React** for icons
- **Formspree** for contact form delivery

## Contact

Haebaragi Studio — [haebaragistudio2@gmail.com](mailto:haebaragistudio2@gmail.com)
