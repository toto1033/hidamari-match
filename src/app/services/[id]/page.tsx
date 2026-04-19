import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Phone, Users, Star, CheckCircle, ArrowLeft, Calendar } from "lucide-react";
import Header from "@/components/Header";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) notFound();

  const slotsColor =
    service.availableSlots === 0 ? "text-red-500 bg-red-50" :
    service.availableSlots <= 2 ? "text-yellow-600 bg-yellow-50" :
    "text-green-600 bg-green-50";

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <div className={`h-48 bg-gradient-to-br ${service.imageColor} flex items-end`}>
        <div className="max-w-4xl mx-auto w-full px-4 pb-6">
          <Link href="/services" className="inline-flex items-center gap-1 text-white/80 text-sm hover:text-white mb-3">
            <ArrowLeft className="w-4 h-4" />
            施設一覧に戻る
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{service.name}</h1>
              <p className="text-orange-500 font-medium">{service.catchphrase}</p>
            </div>
            <span className={`text-sm font-bold px-4 py-2 rounded-full ${slotsColor}`}>
              {service.availableSlots === 0 ? "満員" : `空き ${service.availableSlots}名`}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{service.address}</span>
            <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{service.tel}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{service.openTime}〜{service.closeTime}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />定員 {service.capacity}名</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-700">{service.rating}</span>
              <span>({service.reviewCount}件のレビュー)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-3">施設について</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">対応障害種別</h2>
              <div className="flex flex-wrap gap-2">
                {service.disabilities.map((d) => (
                  <span key={d} className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">{d}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">サービス特徴</h2>
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">基本情報</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500 text-xs mb-0.5">対象年齢</dt>
                  <dd className="font-medium text-gray-800">{service.ageMin}歳〜{service.ageMax}歳</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs mb-0.5">開所日</dt>
                  <dd className="font-medium text-gray-800">
                    <div className="flex gap-1 flex-wrap">
                      {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
                        <span
                          key={day}
                          className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-medium ${
                            service.weekdays.includes(day)
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs mb-0.5">営業時間</dt>
                  <dd className="font-medium text-gray-800">{service.openTime}〜{service.closeTime}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-orange-500 rounded-2xl p-6 text-white">
              <h2 className="font-bold mb-2">見学・お問い合わせ</h2>
              <p className="text-orange-50 text-sm mb-4">まずはお気軽にご連絡ください。</p>
              <a
                href={`tel:${service.tel}`}
                className="flex items-center gap-2 justify-center bg-white text-orange-500 font-bold py-3 rounded-xl text-sm hover:bg-orange-50 transition-colors mb-3"
              >
                <Phone className="w-4 h-4" />
                {service.tel}
              </a>
              <button className="w-full flex items-center gap-2 justify-center bg-orange-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-700 transition-colors">
                <Calendar className="w-4 h-4" />
                見学を申し込む
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-sm py-8 px-4 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">ひだまりマッチ</p>
          <p>© 2026 ひだまりマッチ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
