import { INewsReturn } from "@/@types/news";
import ShowContentPageClient from "./ShowContentPageClient";
import { IWeather } from "@/@types/weather";
import { IBannerReturn } from "@/@types/banner";
import { ICoins } from "@/@types/coins";
import { ICategoryReturn } from "@/@types/category";

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

const fetchNewsBySlug = async (slug: string): Promise<INewsReturn> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar notícia");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return {
      id: 0,
      title: "Notícia não encontrada",
      slug: slug,
      image: "",
      content: "",
      is_fixed: false,
      is_draft: true,
      is_active: false,
      categories: [],
      user: {
        id: 0,
        name: "Desconhecido",
        email: "não informado",
      },
      created_at: new Date().toISOString(),
    };
  }
};

const fetchOtherNews = async (slug: string): Promise<INewsReturn[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/other/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar outras notícias");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar outras notícias:", error);
    return [];
  }
};

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

interface ShowContentPageProps {
  params: { slug: string };
}

const ShowContentPage = async ({ params }: ShowContentPageProps) => {
  const slug = (await params).slug;
  const news = await fetchNewsBySlug(slug);
  const otherNews = await fetchOtherNews(slug);
  const weather = await fetchWeather();
  const categories = await fetchCategories();
  const banners = await fetchBanners();
  const coins = await fetchDol();
  const mostReadNews = await fetchNewsMostRead();

  return (
    <ShowContentPageClient
      news={news}
      weatherInfos={weather}
      categories={categories}
      banners={banners}
      coins={coins}
      mostReadNews={mostReadNews}
      otherNews={otherNews}
    />
  );
};

export default ShowContentPage;
