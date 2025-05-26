import { ICategoryReturn } from "@/@types/category";
import { IWeather } from "@/@types/weather";
import { IBannerReturn } from "@/@types/banner";
import { INewsReturn, IPaginate } from "@/@types/news";
import { ICoins } from "@/@types/coins";
import SearchPageClient from "./SearchPageClient";

const getDefaultPagination = (): IPaginate<INewsReturn> => ({
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
});

function parseWeatherResponse(data: any): IWeather {
  const icon = data.weather?.[0]?.icon || "";
  const temp = data.main.temp;
  const temp_min = data.main.temp_min;
  const temp_max = data.main.temp_max;
  const temp_avg = (temp_min + temp_max) / 2;

  return {
    icon,
    temp,
    temp_min,
    temp_max,
    temp_avg,
  };
}

const fetchCategories = async (): Promise<ICategoryReturn[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar categorias");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};

const API_KEY = `${process.env.API_WEATHER_KEY}`;
const LAT = -23.7658;
const LON = -53.325;

const fetchWeather = async (): Promise<IWeather> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar dados do clima");
  }

  const data = await res.json();

  return parseWeatherResponse(data);
};

const fetchBanners = async (): Promise<IBannerReturn[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar banners");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar banners:", error);
    return [];
  }
};

const fetchNewsMostRead = async (): Promise<INewsReturn[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/views`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar notícias");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
};

const fetchDol = async (): Promise<ICoins> => {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar cotação de Dólar");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar cotação de Dólar:", error);
    throw error;
  }
};

const fetchNewsByTitle = async (
  title: string
): Promise<IPaginate<INewsReturn>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/title?title=${title}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar notícias por titulo");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar notícias por titulo:", error);
    return getDefaultPagination();
  }
};

interface SearchPageProps {
  params: { query: string };
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const title = (await params).query;

  const categories = await fetchCategories();
  const weather = await fetchWeather();
  const banners = await fetchBanners();
  const coins = await fetchDol();
  const mostReadNews = await fetchNewsMostRead();

  const newsByTitle = title
    ? await fetchNewsByTitle(title)
    : getDefaultPagination();

  return (
    <SearchPageClient
      weatherInfos={weather}
      categories={categories}
      banners={banners}
      coins={coins}
      mostReadNews={mostReadNews}
      newsByTitle={newsByTitle.data}
      pagination={newsByTitle}
      title={title}
    />
  );
};

export default SearchPage;
