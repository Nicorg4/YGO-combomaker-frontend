import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yu-Gi-Oh! Combo Maker",
  description: "Yu-Gi-Oh! Combo maker",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed bottom-5 right-5 z-10">
          <Image src={"/images/puzzle.png"} width={50} height={50} alt="Logo" />
        </div>
        {children}
      </body>
    </html>
  );
}
