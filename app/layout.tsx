import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import ThemeProvider from "@/components/ui/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Streamer App",
  description: "Your favorite streaming platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider>
          <NavBar />
          <main className="bg-base-100 text-base-content">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}