# Streamer

A modern movie and TV show streaming platform built with Next.js.

## Overview

Streamer is a web application that provides users with an intuitive interface to browse, search, and explore movies and TV shows. It features a responsive design, dynamic content loading, and theme customization.

## Features

- **Movie & TV Show Browsing**: Browse through trending movies, TV series, and other media content
- **Search Functionality**: Search for specific movies or TV shows
- **Detailed Media Pages**: View comprehensive information about each title
- **Responsive Design**: Optimized viewing experience across all devices
- **Theme Switching**: Toggle between light and dark modes
- **Rating System**: Visual representation of movie and show ratings

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS with DaisyUI components
- **API**: Integration with movie database APIs
- **Image Handling**: Next.js Image optimization
- **Navigation**: Dynamic routing with Next.js

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/streamer.git
cd streamer
```

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Main application routes and API endpoints
- `/components`: Reusable React components
  - `/ui`: UI components like NavBar, SearchInput, etc.
- `/utils`: Utility functions like API client

## API Routes

The application includes several API endpoints:

- `/api/movies`: Get trending movies
- `/api/movies/[id]`: Get details for a specific movie or TV show
- `/api/movie`: Get movie listings
- `/api/tv`: Get TV series listings
- `/api/search`: Search for media content

## Customization

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
