import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import Clarity from '@microsoft/clarity';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ask her out",
  description: "App to ask her out",
};

Clarity.init("phznmg4p7m");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
      <Toaster />
    </html>
  );
}
