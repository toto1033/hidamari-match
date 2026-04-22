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
  title: "ひだまりマッチ | 放課後等デイサービス検索",
  description: "全国の放課後等デイサービスを検索・比較。障害特性・地域・特徴から最適な施設を見つけましょう。",
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
