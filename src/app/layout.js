import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import { ToastProvider } from "@/components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FIFA World Cup 2026 - Booking",
  description: "Reserve seus ingressos para a Copa do Mundo 2026.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary selection:bg-brand-primary/30">
        <Providers>
          <ToastProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
