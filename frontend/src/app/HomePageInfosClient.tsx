"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { INewsReturn } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import HomeOneBannerComponent from "@/components/HomePage/Banners/HomeOneBannerComponent";
import TopBannerComponent from "@/components/HomePage/Banners/TopBannerComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import FeaturedNewsComponent from "@/components/HomePage/News/FeaturedNewsComponent";
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
        <section className="w-full flex flex-col items-center justify-center mt-5">
          <TopBannerComponent banners={banners} />
          <FeaturedNewsComponent news={news} />
          <HomeOneBannerComponent banner={banners} />
        </section>
      </main>
    </DashboardLayoutProvider>
  );
};

export default HomePageInfosClient;
