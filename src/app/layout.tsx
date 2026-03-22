import type { Metadata } from "next";
import { Montserrat, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abbas Anna Anoir — BrainToBrain",
  description:
    "Neurobiológus kutató, a Semmelweis Egyetem PhD hallgatója, a Magyar Tudomány Éve Tudományos Nagykövete. Neurodegeneratív betegségek, autofágia, agyöregedés.",
  keywords: [
    "Abbas Anna Anoir",
    "BrainToBrain",
    "neurobiológia",
    "Huntington-kór",
    "autofágia",
    "agyöregedés",
    "Semmelweis Egyetem",
    "tudományos nagykövet",
  ],
  openGraph: {
    title: "Abbas Anna Anoir — BrainToBrain",
    description: "Neurobiológus kutató · Tudományos Nagykövet · Semmelweis Egyetem",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hu"
      className={`${montserrat.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
