"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { INewsReturn } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import TopBannerComponent from "@/components/HomePage/Banners/TopBannerComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import FeaturedNews from "@/components/HomePage/News/FeaturedNews";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";

interface HomePageInfosClient {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
  banners: IBannerReturn[];
  news: INewsReturn[];
}

const HomePageInfosClient = ({
  categories,
  weatherInfos,
  banners,
  news,
}: HomePageInfosClient) => {
  return (
    <DashboardLayoutProvider>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
      <main className="flex flex-col items-center justify-center mt-28 md:mt-48 mx-4 sm:mx-12">
        <TopBannerComponent banners={banners} />
        <FeaturedNews news={news} />
      </main>
    </DashboardLayoutProvider>
  );
};

export default HomePageInfosClient;
