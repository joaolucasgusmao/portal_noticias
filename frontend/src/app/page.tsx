import { ICategoryReturn } from "@/@types/category";
import CategoriesListClient from "./CategoriesListClient";
import { IWeather } from "@/@types/weather";

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

const NewsListPage = async () => {
  const categories = await fetchCategories();
  const weather = await fetchWeather();
  return (
    <CategoriesListClient weatherInfos={weather} categories={categories} />
  );
};

export default NewsListPage;
