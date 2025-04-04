export interface IBannerCreate {
  description: string;
  image: string;
  link: string;
  positions: Array<"home" | "top" | "side">;
  is_active: boolean;
}

export interface IBannerReturn {
  id: number;
  description: string;
  image: string;
  link: string;
  positions: Array<"home" | "top" | "side">;
  is_active: boolean;
  updated_at: string;
  created_at: string;
}
