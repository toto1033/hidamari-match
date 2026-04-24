import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin, Phone, Clock, Users, Car, Star, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';
import { getFacilityById } from '@/data/facilities';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const facility = await getFacilityById(id);

  if (!facility) {
    return { title: '施設が見つかりません' };
  }

  return {
    title: facility.name,
    description: `${facility.city}にある${facility.name}の詳細情報。${facility.catchcopy}。空き状況・見学申込はひだまりマッチから。`,
    openGraph: {
      title: `${facility.name} | ひだまりマッチ`,
      description: `${facility.city}にある${facility.name}の詳細情報。${facility.catchcopy}`,
    },
  };
}

export default async function FacilityPage({ params }: PageProps) {
  const { id } = await params;
  const facility = await getFacilityById(id);

  if (!facility) notFound();

  const hasVacancy = facility.vacancyCount > 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />

      {/* Hero image */}
      <div
        className="w-full h-48 md:h-64 flex items-center justify-center"
        style={facility.hasPhoto ? { backgroundColor: '#EDF8F7' } : { backgroundColor: facility.imageColor }}
      >
        {facility.hasPhoto ? (
          <span className="text-[#5BBDB3] font-medium">施設写真</span>
        ) : (
          <span className="text-white text-7xl font-bold opacity-30 select-none">
            {facility.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Facility header */}
      <div className="bg-white border-b border-[#E8E3DF]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-2xl">{facility.name}</h1>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    hasVacancy
                      ? 'bg-[#F5C842] text-[#2A2520]'
                      : 'bg-[#FFE0E0] text-red-500'
                  }`}
                >
                  {hasVacancy ? `空き${facility.vacancyCount}名` : '満員'}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-[#F5C842] text-[#F5C842]" />
                <span className="font-nunito font-bold text-[#2A2520]">{facility.rating}</span>
                <span className="text-sm text-[#7A6E65]">（{facility.reviewCount}件の口コミ）</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[#7A6E65]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {facility.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 shrink-0" />
                  平日 {facility.weekdayHours}
                </span>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto sm:items-end">
              <a
                href="#contact"
                className="flex-1 sm:flex-none block bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-round)] font-bold px-4 sm:px-6 py-3 rounded-[28px] hover:bg-[#D4A800] transition-colors text-sm text-center sm:min-w-[160px]"
              >
                見学を申し込む
              </a>
              <a
                href={`tel:${facility.phone}`}
                className="flex-1 sm:flex-none block border-2 border-[#5BBDB3] text-[#5BBDB3] font-bold px-4 sm:px-6 py-2.5 rounded-[28px] hover:bg-[#5BBDB3] hover:text-white transition-colors text-sm text-center sm:min-w-[160px]"
              >
                電話する
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Description */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E3DF]">
          <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-lg mb-4">施設の特徴</h2>
          <p className="text-[#7A6E65] leading-relaxed">{facility.description}</p>
        </section>

        {/* Tags */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E3DF]">
          <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-lg mb-4">対応障害・支援内容</h2>
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500 mb-2">対応障害</p>
            <div className="flex flex-wrap gap-2">
              {facility.disabilities.map((d) => (
                <span key={d} className="text-sm bg-white border border-[#5BBDB3] text-[#5BBDB3] px-3 py-1 rounded-full font-medium">{d}</span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm font-semibold text-[#7A6E65] mb-2">支援内容</p>
            <div className="flex flex-wrap gap-2">
              {facility.supportTypes.map((s) => (
                <span key={s} className="text-sm bg-white border border-[#5BBDB3] text-[#5BBDB3] px-3 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#7A6E65] mb-2">対象年齢</p>
            <div className="flex flex-wrap gap-2">
              {facility.ageGroups.map((a) => (
                <span key={a} className="text-sm bg-[#EDF8F7] text-[#5BBDB3] px-3 py-1 rounded-full font-medium">{a}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Basic info */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E3DF]">
          <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-lg mb-4">基本情報</h2>
          <dl className="divide-y divide-[#E8E3DF]">
            {[
              { icon: Users, label: '定員', value: `${facility.capacity}名（現在の空き：${facility.vacancyCount}名）` },
              { icon: Car, label: '送迎', value: facility.hasTransport ? '送迎あり' : '送迎なし' },
              { icon: Clock, label: '平日営業時間', value: facility.weekdayHours },
              { icon: Clock, label: '休日営業時間', value: facility.holidayHours },
              {
                icon: Calendar,
                label: '営業日',
                value: ['月〜金', facility.openSaturday && '土曜', facility.openSunday && '日曜'].filter(Boolean).join('・'),
              },
              { icon: Phone, label: '電話番号', value: facility.phone },
              { icon: MapPin, label: '住所', value: facility.address },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 py-3">
                <dt className="flex items-center gap-2 text-sm text-[#7A6E65] w-36 shrink-0">
                  <Icon className="w-4 h-4" />
                  {label}
                </dt>
                <dd className="text-sm text-[#2A2520] flex-1">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 p-4 bg-[#EDF8F7] rounded-xl">
            <p className="text-sm text-[#7A6E65]">
              <span className="font-semibold text-[#2A2520]">料金について：</span>
              障害児通所支援のため、利用料の9割は公費負担（保護者負担は1割）となります。詳細はお問い合わせください。
            </p>
          </div>
        </section>

        {/* Map */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E3DF]">
          <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-lg px-6 pt-6 pb-4">地図</h2>
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${facility.lng - 0.01},${facility.lat - 0.01},${facility.lng + 0.01},${facility.lat + 0.01}&layer=mapnik&marker=${facility.lat},${facility.lng}`}
            className="w-full h-64 border-0"
            title={`${facility.name}の地図`}
          />
        </section>

        {/* Contact form */}
        <section id="contact" className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E3DF]">
          <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-lg mb-2">見学・お問い合わせ</h2>
          <p className="text-sm text-[#7A6E65] mb-6">下記フォームよりお気軽にお問い合わせください。施設スタッフよりご連絡いたします。</p>
          <ContactForm facilityName={facility.name} />
        </section>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-4">
        <Link href="/search" className="text-sm text-[#5BBDB3] hover:underline">← 検索結果に戻る</Link>
      </div>

      <Footer />
    </div>
  );
}
