import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
  metadataBase: new URL("https://karelzonderling.nl"),
  title: {
    default: "De Show van Karel Zonderling | Kinderpodcast op Spotify",
    template: "%s | Karel Zonderling",
  },
  description:
    "Luister mee naar de avonturen van Karel, Alien Colibri en Snoezy de muis! Een gratis Nederlandse kinderpodcast op Spotify vol superhelden, marshmallows en pratende badeenden.",
  keywords: [
    "kinderpodcast",
    "Karel Zonderling",
    "kinderen",
    "podcast",
    "avonturen",
    "superhelden",
    "Nederlandse kinderpodcast",
    "gratis kinderpodcast",
    "podcast voor kinderen",
    "luisterverhaal kinderen",
    "Spotify kinderpodcast",
    "voorleesverhaal",
  ],
  authors: [{ name: "De Show van Karel Zonderling" }],
  creator: "De Show van Karel Zonderling",
  publisher: "De Show van Karel Zonderling",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://karelzonderling.nl",
    siteName: "De Show van Karel Zonderling",
    title: "De Show van Karel Zonderling | Kinderpodcast op Spotify",
    description:
      "Luister mee naar de avonturen van Karel, Alien Colibri en Snoezy de muis! Een gratis Nederlandse kinderpodcast vol superhelden, marshmallows en pratende badeenden.",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Show van Karel Zonderling | Kinderpodcast",
    description:
      "Luister mee naar de avonturen van Karel, Alien Colibri en Snoezy de muis! Gratis op Spotify.",
  },
  alternates: {
    canonical: "https://karelzonderling.nl",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J9VBCR7Y4J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J9VBCR7Y4J');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
