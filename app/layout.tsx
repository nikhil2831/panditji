import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: "Vishwa Dharmarth Seva Trust | Acharya Ram Kumar Shukla",
  description: "Official website of Vishwa Dharmarth Seva Trust, Ranchi, Jharkhand (India) - under the divine guidance of Param Pujya Acharya Pandit Ram Kumar Shukla (Dharmacharya)."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${notoDevanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}

