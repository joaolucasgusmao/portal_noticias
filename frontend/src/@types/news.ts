interface INews {
  hat: string;
  title: string;
  summary: string;
  image: string;
  content: string;
  caption: string;
  topics: string[];
  categories: number[];
  is_draft?: boolean;
  is_fixed?: boolean;
}
