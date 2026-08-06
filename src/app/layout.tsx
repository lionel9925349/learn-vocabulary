import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artikel-Trainer — Logistik & IT",
  description:
    "Apprends le vocabulaire allemand de la logistique et de l'IT : der/die/das et toutes les déclinaisons, plus de 300 mots expliqués.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sourceSerif.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}`}
        </Script>
        <Header />
        <main className="flex-1 w-full flex justify-center px-4 py-8">
          <div className="w-full max-w-2xl">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
