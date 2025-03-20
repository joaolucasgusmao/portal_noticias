import { ICategory } from "./category";
import { IUser } from "./user";

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
  title: string;
  hat?: string;
  summary?: string;
  image: string;
  caption?: string;
  topics?: string[];
  content: string;
  is_fixed: boolean;
  is_draft: boolean;
  is_active: boolean;
  categories: ICategory[];
  user: IUser;
  created_at: string;
}
