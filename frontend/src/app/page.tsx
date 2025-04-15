import { ICategoryReturn } from "@/@types/category";
import { IWeather } from "@/@types/weather";
import HomePageInfosClient from "./HomePageInfosClient";
import { IBannerReturn } from "@/@types/banner";
import { INewsReturn } from "@/@types/news";

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

export async function fetchWeather(): Promise<IWeather> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar dados do clima");
  }

  const data = await res.json();

  return parseWeatherResponse(data);
}

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

const fetchNews = async (): Promise<INewsReturn[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar notícias");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
};

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

const HomePage = async () => {
  const categories = await fetchCategories();
  const weather = await fetchWeather();
  const banners = await fetchBanners();
  const news = await fetchNews();
  return (
    <HomePageInfosClient
      weatherInfos={weather}
      categories={categories}
      banners={banners}
      news={news}
    />
  );
};

export default HomePage;
