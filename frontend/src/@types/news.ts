import { ICategory } from "./category";

export interface INews {
  hat?: string;
  title: string;
  summary?: string;
  image: string;
  content: string;
  caption?: string;
  topics?: string[];
  categories: number[];
  is_draft?: boolean;
  is_fixed?: boolean;
}

export interface INewsReturn {
  id: number;
  hat?: string | null;
  title: string;
  summary?: string | null;
  image: string;
  content: string;
  caption?: string | null;
  topics?: string[];
  is_fixed: boolean;
  is_draft: boolean;
  user_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  categories: ICategory[];
}
