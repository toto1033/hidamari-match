import Link from "next/link";
import { Search, MapPin, Heart, CheckCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

export default function Home() {
  const featured = services.slice(0, 3);

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-200 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            お子さまにぴったりの<br />放課後等デイサービスを探そう
          </h1>
          <p className="text-lg text-orange-50 mb-10 leading-relaxed">
            全国の放課後等デイサービスを一覧で比較・検索。<br />
            障害特性・地域・特徴から、最適な施設が見つかります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors shadow-lg"
            >
              <Search className="w-5 h-5" />
              施設を探す
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold px-8 py-4 rounded-full hover:bg-orange-700 transition-colors"
            >
              使い方を見る
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-8 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { number: "1,200+", label: "掲載施設数" },
            { number: "47", label: "対応都道府県" },
            { number: "3,400+", label: "マッチング実績" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-orange-500">{stat.number}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            3ステップで施設が見つかる
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, step: "1", title: "条件を入力", desc: "地域・障害種別・希望のサービスを選んで検索するだけ。" },
              { icon: MapPin, step: "2", title: "施設を比較", desc: "空き状況・評判・特徴を一覧で比較できます。" },
              { icon: Heart, step: "3", title: "見学を申し込む", desc: "気になる施設に直接問い合わせ・見学申し込みが可能。" },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-orange-500" />
                </div>
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">注目の施設</h2>
            <Link href="/services" className="text-sm text-orange-500 hover:underline">すべて見る →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">放課後等デイサービスとは</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            放課後等デイサービスは、障害のある就学児童・生徒（小学生〜高校生）が、放課後や学校の長期休暇中に通うことができる福祉サービスです。
            生活能力の向上や社会との交流、創作活動など、お子さまの健やかな成長をサポートする様々なプログラムが用意されています。
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "就学している障害児（6〜18歳）が対象",
              "受給者証があれば利用できます",
              "利用料の9割は公費負担（1割負担）",
              "送迎サービスのある施設も多数",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-orange-500 to-yellow-400 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-4">施設選びにお困りですか？</h2>
          <p className="text-orange-50 mb-8">
            専門のコーディネーターが、お子さまの障害特性や生活状況に合わせた施設選びをサポートします。お気軽にご相談ください。
          </p>
          <a
            href="mailto:info@hidamari-match.example.com"
            className="inline-block bg-white text-orange-500 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors shadow-lg"
          >
            無料相談を申し込む
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">ひだまりマッチ</p>
          <p>© 2026 ひだまりマッチ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
