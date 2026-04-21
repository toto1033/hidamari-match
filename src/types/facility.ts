export type Disability =
  | '発達障害'
  | '知的障害'
  | '身体障害'
  | '重症心身障害'
  | '精神障害';

export type SupportType =
  | '個別支援'
  | '集団活動'
  | '学習支援'
  | '運動療育'
  | '音楽療育'
  | 'SST'
  | '作業療法'
  | '言語療法'
  | 'IT・プログラミング';

export type AgeGroup = '未就学児' | '小学生' | '中学生' | '高校生';

export type Facility = {
  id: string;
  name: string;
  catchcopy: string;
  description: string;
  prefecture: string;
  city: string;
  address: string;
  phone: string;
  capacity: number;
  vacancyCount: number;
  weekdayHours: string;
  holidayHours: string;
  openSaturday: boolean;
  openSunday: boolean;
  hasTransport: boolean;
  rating: number;
  reviewCount: number;
  disabilities: Disability[];
  supportTypes: SupportType[];
  ageGroups: AgeGroup[];
  imageColor: string;
  hasPhoto: boolean;
  lat: number;
  lng: number;
};

export type SearchParams = {
  prefecture?: string;
  keyword?: string;
  disabilities?: Disability[];
  ageGroups?: AgeGroup[];
  supportTypes?: SupportType[];
  hasTransport?: boolean;
  hasVacancy?: boolean;
  sortBy?: 'recommended' | 'rating' | 'newest';
};
