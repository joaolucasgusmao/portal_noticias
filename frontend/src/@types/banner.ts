export interface IBannerCreate {
  image: string;
  link: string;
  top: boolean | null;
  side: boolean | null;
  home: boolean | null;
  description: string;
}

export interface IBannerReturn {
  id: number;
  image: string;
  link: string;
  top?: boolean;
  side?: boolean;
  home?: boolean;
  description: string;
  updated_at: string;
  created_at: string;
}
