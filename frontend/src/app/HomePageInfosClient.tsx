"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { ICoins } from "@/@types/coins";
import { INewsReturn } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import TopBannerComponent from "@/components/HomePage/Banners/TopBannerComponent";
import SuperTopBannerComponent from "@/components/HomePage/Banners/SuperTopBannerComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import FeaturedNewsComponent from "@/components/HomePage/News/FeaturedNewsComponent";
import HomeNewsComponent from "@/components/HomePage/News/HomeNewsComponent";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";

interface HomePageInfosClient {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
  banners: IBannerReturn[];
  news: INewsReturn[];
  mostReadNews: INewsReturn[];
  coins: ICoins;
}

const HomePageInfosClient = ({
  categories,
  weatherInfos,
  banners,
  news,
  coins,
  mostReadNews,
}: HomePageInfosClient) => {
  return (
    <DashboardLayoutProvider>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
      <main className="flex flex-col items-center justify-center mt-28 md:mt-28 mx-4 sm:mx-12">
        <section className="w-full flex flex-col items-center justify-center mt-5">
          <SuperTopBannerComponent banners={banners} />
          <FeaturedNewsComponent news={news} />
          <TopBannerComponent banner={banners} />
        </section>
        <section className="w-full flex flex-col items-center justify-center mt-5">
          <HomeNewsComponent
            news={news}
            coins={coins}
            banners={banners}
            mostReadNews={mostReadNews}
          />
        </section>
      </main>
    </DashboardLayoutProvider>
  );
};

export default HomePageInfosClient;
