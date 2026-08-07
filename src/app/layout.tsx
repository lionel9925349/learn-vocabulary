import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { asset } from "@/lib/basePath";

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
  title: "Artikel-Trainer — Logistik, Einkauf & IT",
  description:
    "Vocabulaire allemand de la logistique, des achats et de l'informatique : articles, déclinaisons et répétition espacée. Fonctionne hors-ligne.",
  manifest: asset("/manifest.webmanifest"),
  appleWebApp: {
    capable: true,
    title: "Artikel",
    statusBarStyle: "default",
  },
  icons: {
    icon: asset("/icons/icon-192.png"),
    apple: asset("/icons/icon-192.png"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Une app d'apprentissage se consulte d'une main : on évite le zoom accidentel
  // mais on laisse l'utilisateur zoomer s'il en a besoin.
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eae4d8" },
    { media: "(prefers-color-scheme: dark)", color: "#14171c" },
  ],
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
        <ServiceWorkerRegister />
        <Header />
        <main className="flex-1 w-full flex justify-center px-4 py-6">
          <div className="w-full max-w-2xl pb-24">{children}</div>
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
