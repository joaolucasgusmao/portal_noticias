import { ICategoryReturn } from "./category";
import { IUserCreate } from "./user";

export interface INewsCreate {
  hat?: string;
  title: string;
  slug: string;
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
  slug: string;
  hat?: string;
  summary?: string;
  image: string;
  caption?: string;
  topics?: string[];
  content: string;
  is_fixed: boolean;
  is_draft: boolean;
  is_active: boolean;
  categories: ICategoryReturn[];
  user: IUserCreate;
  created_at: string;
}
