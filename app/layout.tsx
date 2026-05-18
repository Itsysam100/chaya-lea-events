import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Infant } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
  display: "swap",
});

const cormorantInfant = Cormorant_Infant({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chaya Lea Rabinovitz | Event Planner",
  description:
    "Elegant event planning for weddings, bar & bat mitzvahs, sheva brachot, and engagement parties.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorantInfant.variable}`}
    >
      <body className="bg-pink-50 text-pink-900 antialiased">{children}</body>
    </html>
  );
}
