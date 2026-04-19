export type DisabilityType = "知的障害" | "発達障害" | "身体障害" | "精神障害" | "重症心身障害";
export type ServiceFeature = "送迎あり" | "個別支援" | "集団活動" | "学習支援" | "運動療育" | "音楽療育" | "作業療法" | "言語療法" | "日常生活訓練";

export type Service = {
  id: string;
  name: string;
  prefecture: string;
  city: string;
  address: string;
  tel: string;
  capacity: number;
  availableSlots: number;
  disabilities: DisabilityType[];
  features: ServiceFeature[];
  ageMin: number;
  ageMax: number;
  weekdays: string[];
  openTime: string;
  closeTime: string;
  description: string;
  catchphrase: string;
  imageColor: string;
  rating: number;
  reviewCount: number;
};

export const PREFECTURES = ["東京都", "神奈川県", "埼玉県", "千葉県", "大阪府", "愛知県", "福岡県"];

export const ALL_DISABILITIES: DisabilityType[] = ["知的障害", "発達障害", "身体障害", "精神障害", "重症心身障害"];
export const ALL_FEATURES: ServiceFeature[] = ["送迎あり", "個別支援", "集団活動", "学習支援", "運動療育", "音楽療育", "作業療法", "言語療法", "日常生活訓練"];

export const services: Service[] = [
  {
    id: "1",
    name: "ひだまりキッズ 渋谷教室",
    prefecture: "東京都",
    city: "渋谷区",
    address: "東京都渋谷区桜丘町1-2-3",
    tel: "03-1234-5678",
    capacity: 10,
    availableSlots: 3,
    disabilities: ["発達障害", "知的障害"],
    features: ["送迎あり", "個別支援", "学習支援", "運動療育"],
    ageMin: 6,
    ageMax: 18,
    weekdays: ["月", "火", "水", "木", "金"],
    openTime: "14:00",
    closeTime: "18:00",
    description: "お子さま一人ひとりの個性を大切にしながら、楽しく通える放課後の居場所を提供しています。専門スタッフによる個別支援計画のもと、学習支援から運動まで幅広いプログラムをご用意しています。",
    catchphrase: "一人ひとりの「できた！」を大切に",
    imageColor: "from-orange-400 to-yellow-300",
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: "2",
    name: "にじいろステーション 新宿",
    prefecture: "東京都",
    city: "新宿区",
    address: "東京都新宿区西新宿4-5-6",
    tel: "03-2345-6789",
    capacity: 15,
    availableSlots: 0,
    disabilities: ["発達障害", "精神障害"],
    features: ["送迎あり", "集団活動", "音楽療育", "言語療法"],
    ageMin: 6,
    ageMax: 15,
    weekdays: ["月", "水", "金", "土"],
    openTime: "13:00",
    closeTime: "18:00",
    description: "音楽や芸術活動を通じて、子どもたちのコミュニケーション能力と自己表現力を育みます。集団活動を中心に、社会性の向上を目指したプログラムを実施しています。",
    catchphrase: "音楽で心をつなぐ、笑顔あふれる毎日",
    imageColor: "from-purple-400 to-pink-300",
    rating: 4.6,
    reviewCount: 18,
  },
  {
    id: "3",
    name: "そらいろ放課後クラブ 横浜",
    prefecture: "神奈川県",
    city: "横浜市",
    address: "神奈川県横浜市中区本町7-8-9",
    tel: "045-345-6789",
    capacity: 12,
    availableSlots: 5,
    disabilities: ["知的障害", "身体障害", "重症心身障害"],
    features: ["送迎あり", "個別支援", "作業療法", "日常生活訓練"],
    ageMin: 6,
    ageMax: 18,
    weekdays: ["月", "火", "水", "木", "金", "土"],
    openTime: "14:00",
    closeTime: "19:00",
    description: "身体障害・重症心身障害のお子さまへの専門的な支援が強みです。理学療法士・作業療法士が在籍し、日常生活動作の向上を支援します。バリアフリー環境を完備しています。",
    catchphrase: "専門的なケアで、可能性を広げる",
    imageColor: "from-sky-400 to-cyan-300",
    rating: 4.9,
    reviewCount: 31,
  },
  {
    id: "4",
    name: "たんぽぽ学習室 大宮",
    prefecture: "埼玉県",
    city: "さいたま市",
    address: "埼玉県さいたま市大宮区宮町2-3-4",
    tel: "048-456-7890",
    capacity: 8,
    availableSlots: 2,
    disabilities: ["発達障害", "知的障害"],
    features: ["個別支援", "学習支援", "運動療育"],
    ageMin: 6,
    ageMax: 18,
    weekdays: ["月", "火", "木", "金"],
    openTime: "15:00",
    closeTime: "18:30",
    description: "学習支援に特化した放課後等デイサービスです。少人数制で一人ひとりの学習ペースに合わせた丁寧な指導を行います。宿題サポートから受験対策まで対応しています。",
    catchphrase: "学ぶ喜びを、一緒に見つけよう",
    imageColor: "from-green-400 to-teal-300",
    rating: 4.7,
    reviewCount: 15,
  },
  {
    id: "5",
    name: "ほし児童デイサービス 千葉",
    prefecture: "千葉県",
    city: "千葉市",
    address: "千葉県千葉市中央区中央5-6-7",
    tel: "043-567-8901",
    capacity: 10,
    availableSlots: 4,
    disabilities: ["発達障害", "知的障害", "精神障害"],
    features: ["送迎あり", "集団活動", "個別支援", "運動療育", "学習支援"],
    ageMin: 6,
    ageMax: 18,
    weekdays: ["月", "火", "水", "木", "金", "土"],
    openTime: "13:00",
    closeTime: "18:00",
    description: "運動と学習をバランスよく取り入れたプログラムが特徴です。体を動かすことで情緒の安定を図りながら、学習支援も充実しています。送迎サービスも対応しています。",
    catchphrase: "元気に動いて、笑顔で学ぼう",
    imageColor: "from-yellow-400 to-orange-300",
    rating: 4.5,
    reviewCount: 22,
  },
  {
    id: "6",
    name: "かがやき発達支援センター 大阪",
    prefecture: "大阪府",
    city: "大阪市",
    address: "大阪府大阪市北区梅田1-2-3",
    tel: "06-6789-0123",
    capacity: 20,
    availableSlots: 6,
    disabilities: ["発達障害", "知的障害", "精神障害", "身体障害"],
    features: ["送迎あり", "個別支援", "集団活動", "言語療法", "作業療法", "日常生活訓練"],
    ageMin: 3,
    ageMax: 18,
    weekdays: ["月", "火", "水", "木", "金"],
    openTime: "14:00",
    closeTime: "18:30",
    description: "言語療法士・作業療法士・臨床心理士などの専門スタッフが揃った大型の発達支援センターです。幼児期から高校生まで幅広い年齢に対応し、継続的な支援が可能です。",
    catchphrase: "専門家チームで、お子さまの未来を輝かせる",
    imageColor: "from-red-400 to-pink-300",
    rating: 4.9,
    reviewCount: 45,
  },
];

export function filterServices(params: {
  prefecture?: string;
  disabilities?: DisabilityType[];
  features?: ServiceFeature[];
  hasSlots?: boolean;
  keyword?: string;
}): Service[] {
  return services.filter((s) => {
    if (params.prefecture && s.prefecture !== params.prefecture) return false;
    if (params.disabilities?.length && !params.disabilities.some((d) => s.disabilities.includes(d))) return false;
    if (params.features?.length && !params.features.some((f) => s.features.includes(f))) return false;
    if (params.hasSlots && s.availableSlots === 0) return false;
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      if (!s.name.toLowerCase().includes(kw) && !s.city.toLowerCase().includes(kw) && !s.description.toLowerCase().includes(kw)) return false;
    }
    return true;
  });
}
