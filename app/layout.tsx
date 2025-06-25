import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CNPトレカ合宿 2025 in 高知・CNハウス | 参加者大募集！",
  description: "高知の豊かな自然に囲まれたクリプトニンジャハウスで、CNPトレカをとことん楽しむ1泊2日の合宿を開催！仲間と一緒に最高の夏の思い出を作りませんか？参加者募集中！",
  keywords: ["CNP", "トレカ", "合宿", "高知", "CNハウス", "クリプトニンジャ", "ワイガヤ"],
  openGraph: {
    title: "CNPトレカ合宿 2025 in 高知・CNハウス | 参加者大募集！",
    description: "高知の豊かな自然に囲まれたクリプトニンジャハウスで、CNPトレカをとことん楽しむ1泊2日の合宿を開催！",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CNPトレカ合宿 2025 in 高知・CNハウス",
    description: "高知の豊かな自然に囲まれたクリプトニンジャハウスで、CNPトレカをとことん楽しむ1泊2日の合宿を開催！",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
