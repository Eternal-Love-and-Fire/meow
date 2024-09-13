import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { getDictionary } from "@/dictionaries";
import { Header4 } from "@/components/header/Header4";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateStaticParams() {
  return [{ lang: "kz" }, { lang: "en" }, { lang: "ru" }];
}

export const metadata: Metadata = {
  title: "Meow",
  description: "Done by Eternal Love",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang} className="min-h-screen w-full overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        <ThemeProvider>
          <Header4 />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
