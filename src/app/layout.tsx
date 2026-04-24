import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-zen-maru',
});

const notoSans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hidamari-match.vercel.app'),
  title: {
    default: 'ひだまりマッチ | 放課後等デイサービス検索',
    template: '%s | ひだまりマッチ',
  },
  description: '放課後等デイサービスの検索・比較サイト。お子さまにぴったりの施設が見つかります。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${notoSans.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
