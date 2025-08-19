import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import sanityClient from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await sanityClient.fetch<any>(siteSettingsQuery);
    const title = settings?.title || 'Portfolio';
    const description = settings?.description || 'Personal site';
    const ogImage = settings?.ogImage?.asset?.url;
    return {
      title,
      description,
      openGraph: { title, description, images: ogImage ? [{ url: ogImage }] : undefined },
      twitter: { card: 'summary_large_image', title, description, images: ogImage ? [ogImage] : undefined },
    };
  } catch {
    return { title: 'Portfolio', description: 'Personal site' };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
