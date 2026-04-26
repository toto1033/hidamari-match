export type HeroPhoto = {
  facilityId: string;
  facilityName: string;
  area: string;
  imageSrc: string;
  alt: string;
};

export const heroPhotosTop: HeroPhoto[] = [
  { facilityId: 'uuid-1', facilityName: 'ひだまり児童デイ 栄店', area: '名古屋市中区', imageSrc: '', alt: '工作・創作活動の様子' },
  { facilityId: 'uuid-2', facilityName: 'のびのびスポーツ教室', area: '名古屋市北区', imageSrc: '', alt: '運動療育の様子' },
  { facilityId: 'uuid-3', facilityName: '音楽の森 放課後教室', area: '名古屋市瑞穂区', imageSrc: '', alt: '音楽療育の様子' },
  { facilityId: 'uuid-4', facilityName: 'まなびの家 大曽根', area: '名古屋市北区', imageSrc: '', alt: '学習支援の様子' },
  { facilityId: 'uuid-5', facilityName: 'コードキッズ栄', area: '名古屋市中区', imageSrc: '', alt: 'IT・プログラミングの様子' },
  { facilityId: 'uuid-6', facilityName: 'なかよし放課後クラブ', area: '名古屋市守山区', imageSrc: '', alt: 'SST・集団活動の様子' },
  { facilityId: 'uuid-7', facilityName: 'みどり放課後教室', area: '名古屋市天白区', imageSrc: '', alt: '自然・農業療育の様子' },
  { facilityId: 'uuid-8', facilityName: 'たのしいステージ', area: '名古屋市昭和区', imageSrc: '', alt: '表現・演劇活動の様子' },
];

export const heroPhotosBottom: HeroPhoto[] = [...heroPhotosTop].reverse();
