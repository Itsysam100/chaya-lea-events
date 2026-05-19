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
  title: "Elite Events Stamford Hill | Event Planner",
  description:
    "Luxury event planning in Stamford Hill, London. Weddings, bar & bat mitzvahs, sheva brachot, and engagement parties.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorantInfant.variable}`}
    >
      <body className="bg-ivory text-mahogany antialiased">{children}</body>
    </html>
  );
}
