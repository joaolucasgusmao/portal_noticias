import { INewsReturn, IPaginate } from "@/@types/news";
import NewsListClient from "./NewsListClient";

const fetchNews = async (page: number): Promise<IPaginate<INewsReturn>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/paginate?page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar notícias");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return {
      data: [],
      meta: {
        current_page: 1,
        from: 0,
        last_page: 1,
        links: [],
        path: "",
        per_page: 10,
        to: 0,
        total: 0,
      },
      links: {
        first: "",
        last: "",
        prev: null,
        next: null,
      },
    };
  }
};

const NewsListPage = async ({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) => {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams?.page
    ? Number(resolvedSearchParams.page)
    : 1;

  const result = await fetchNews(page);

  return <NewsListClient news={result.data} pagination={result} />;
};

export default NewsListPage;
