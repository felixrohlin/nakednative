import type { Metadata } from "next";
import { Jost, Work_Sans } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naked Native",
  description: "Fair trade eco lifestyle goods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
