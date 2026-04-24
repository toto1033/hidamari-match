import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ForFacilitiesClient from './ForFacilitiesClient';

export const metadata: Metadata = {
  title: '施設掲載のご案内',
  description: '放課後等デイサービスの新規利用者獲得をサポート。完全成果報酬型で、問い合わせゼロなら費用ゼロ。無料掲載から始められます。',
};

export default function ForFacilitiesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1">
        <ForFacilitiesClient />
      </main>
      <Footer />
    </div>
  );
}
