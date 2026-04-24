import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'ひだまりマッチへのお問い合わせはこちら。保護者の方・施設の方どちらもお気軽にご連絡ください。',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}
