import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "De Show van Karel Zonderling | Kinderpodcast",
  description:
    "Welkom in het geheime hoofdkwartier! Luister mee naar de avonturen van Karel, Alien Colibri en Snoezy de muis.",
  keywords: ["kinderpodcast", "Karel Zonderling", "kinderen", "podcast", "avonturen", "superhelden"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
