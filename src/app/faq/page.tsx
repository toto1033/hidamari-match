import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'よくある質問',
  description: 'ひだまりマッチの使い方・放課後等デイサービスの費用・受給者証についてよくある質問をまとめました。',
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <FaqClient />
      </main>
      <Footer />
    </div>
  );
}
