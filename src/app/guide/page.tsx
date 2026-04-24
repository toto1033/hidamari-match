import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuideClient from './GuideClient';

export const metadata: Metadata = {
  title: '初めての方へ',
  description: '放課後等デイサービスの利用方法を解説。受給者証の取得から施設探し・見学・契約までの流れをわかりやすくご説明します。',
};

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1">
        <GuideClient />
      </main>
      <Footer />
    </div>
  );
}
