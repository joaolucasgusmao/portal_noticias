import { INewsReturn } from "@/@types/news";
import NewsListClient from "./NewsListClient";

const fetchNews = async (): Promise<INewsReturn[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/paginate`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar notícias");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
};

const NewsListPage = async () => {
  const news = await fetchNews();

  return <NewsListClient news={news} />;
};

export default NewsListPage;
