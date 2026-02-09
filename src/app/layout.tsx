import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin", "greek"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Τα Νέα του Σχολείου",
  description: "Η ψηφιακή μας σχολική εφημερίδα",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}