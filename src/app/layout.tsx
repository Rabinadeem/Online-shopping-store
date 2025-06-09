import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreLayout from "../components/StoreLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rabia Online Store",
  description: "A beautiful online clothing store built with Next.js",
  keywords: [
    "clothing store", "online shop", "fashion", "dresses", "Next.js", "React", "ecommerce", "buy clothes online", "women's fashion", "men's fashion"
  ],
  openGraph: {
    title: "Rabia Online Store",
    description: "Shop the latest dresses and fashion online. Secure checkout, fast delivery.",
    url: "https://your-deployed-url.com/",
    siteName: "Rabia Online Store",
    images: [
      {
        url: "/globe.svg",
        width: 1200,
        height: 630,
        alt: "Rabia Online Store Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabia Online Store",
    description: "Shop the latest dresses and fashion online. Secure checkout, fast delivery.",
    images: ["/globe.svg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="author" content="Rabia Online Store" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rabia Online Store" />
        <meta property="og:description" content="Shop the latest dresses and fashion online. Secure checkout, fast delivery." />
        <meta property="og:image" content="/globe.svg" />
        <meta property="og:url" content="https://your-deployed-url.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rabia Online Store" />
        <meta name="twitter:description" content="Shop the latest dresses and fashion online. Secure checkout, fast delivery." />
        <meta name="twitter:image" content="/globe.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreLayout>{children}</StoreLayout>
      </body>
    </html>
  );
}
