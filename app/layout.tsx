import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import GlobalBanner from "./components/GlobalBanner";

import { Analytics } from '@vercel/analytics/next';

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freedom Baptist Mission",
  description: "Transforming Lives Across Kenya & Beyond Through Spreading The Gospel",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <GlobalBanner />
        {children}
        <Analytics />
        <WhatsAppButton />
      </body>
    </html>
  );
}
