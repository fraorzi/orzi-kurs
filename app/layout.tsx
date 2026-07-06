import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "orzi-kurs",
  description: "Nauka programowania — dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${jetbrainsMono.variable} h-full`}>
      <body className="h-full flex bg-[var(--bg)] text-[var(--fg)]">
        <Sidebar />
        <div className="flex-1 min-w-0 h-full overflow-y-auto">{children}</div>
      </body>
    </html>
  );
}
