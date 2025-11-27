import type { Metadata } from "next";
import { Inter, Playwrite_US_Trad } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playwrite = Playwrite_US_Trad({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playwrite"
});

export const metadata: Metadata = {
  title: "Quizzie - Générateur de Quizzes",
  description: "Une application moderne pour générer et gérer des quizzes interactifs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${playwrite.variable}`}>{children}</body>
    </html>
  );
}
