export type DepartmentKey =
  | 'graffix'
  | 'ccc'
  | 'csi'
  | 'operations'
  | 'recreation'
  | 'admin'
  | 'bod';

export type ValueKey =
  | 'accountability'
  | 'integrity'
  | 'innovation'
  | 'community'
  | 'fun'
  | 'connection';

export type ValueLabel =
  | 'Accountability'
  | 'Integrity'
  | 'Innovation'
  | 'Community'
  | 'Fun'
  | 'Connection';

export type AwardType = 'Department' | 'Values' | 'Staff';

export interface Department {
  key: DepartmentKey;
  label: string;
}

export interface ValueDef {
  key: ValueKey;
  title: ValueLabel;
  iconSrc: string;
  body: string;
  why: string;
}

export interface Awardee {
  id: string;
  name: string;
  role: string;
  dept: string;
  deptKey: DepartmentKey;
  value?: ValueLabel;
  quote: string;
  photoUrl?: string;
}

export interface PastAwardee {
  id: string;
  year: number;
  type: AwardType;
  cat: string;
  name: string;
  role: string;
  quote?: string;
  dept: string;
  deptKey: DepartmentKey;
  photoUrl?: string;
}

export interface UAwardsGalleryPhoto {
  id: string;
  src: string;
  thumbUrl?: string;
  alt: string;
  caption: string;
  orientation: 'landscape' | 'portrait';
}

export interface UAwardsGalleryYear {
  year: number;
  theme: string;
  coverFallbackSrc?: string;
  photos: UAwardsGalleryPhoto[];
}

export interface UAwardsData {
  departments: Department[];
  values: ValueDef[];
  current: {
    departmentWinners: Awardee[];
    valueWinners: Awardee[];
    staffWinners: Awardee[];
  };
  past: PastAwardee[];
  galleryByYear: UAwardsGalleryYear[];
}
