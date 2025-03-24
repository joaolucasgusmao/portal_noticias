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

export interface IPaginate<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
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
