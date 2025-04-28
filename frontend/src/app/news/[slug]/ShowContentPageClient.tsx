"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { ICoins } from "@/@types/coins";
import { INewsReturn } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import SideBannerBannerComponent from "@/components/HomePage/Banners/SideBannerComponent";
import SuperTopBannerComponent from "@/components/HomePage/Banners/SuperTopBannerComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import ShowContentNewsComponent from "@/components/HomePage/News/ShowContentNewsComponent";
import CoinsComponent from "@/components/HomePage/commons/CoinsComponent";
import MostReadComponent from "@/components/HomePage/commons/MostReadComponent";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";

interface ShowContentPageClientProps {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
  banners: IBannerReturn[];
  news: INewsReturn;
  mostReadNews: INewsReturn[];
  coins: ICoins;
}

const ShowContentPageClient = ({
  news,
  banners,
  categories,
  coins,
  mostReadNews,
  weatherInfos,
}: ShowContentPageClientProps) => {
  return (
    <DashboardLayoutProvider>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
      <main className="mt-28 md:mt-40 flex flex-col items-center justify-center mx-4 sm:mx-16">
        <SuperTopBannerComponent banners={banners} />
        <section className="max-w-[1295px] flex flex-col lg:flex-row gap-16 mt-10">
          <ShowContentNewsComponent news={news} />
          <div className="flex flex-col gap-16">
            <div className="flex flex-col-reverse lg:flex-col gap-16">
              <CoinsComponent coins={coins} />
              <MostReadComponent mostReadNews={mostReadNews} />
            </div>
            <SideBannerBannerComponent banners={banners} />
          </div>
        </section>
      </main>
    </DashboardLayoutProvider>
  );
};

export default ShowContentPageClient;
