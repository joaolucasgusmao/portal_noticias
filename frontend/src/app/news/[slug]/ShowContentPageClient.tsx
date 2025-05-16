"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { ICoins } from "@/@types/coins";
import { INewsReturn } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import SideBannerBannerComponent from "@/components/HomePage/Banners/SideBannerComponent";
import SuperTopBannerComponent from "@/components/HomePage/Banners/SuperTopBannerComponent";
import FooterComponent from "@/components/HomePage/FooterComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import OtherNewsComponent from "@/components/HomePage/News/OtherNewsComponent";
import ShowContentNewsComponent from "@/components/HomePage/News/ShowContentNewsComponent";
import CoinsComponent from "@/components/HomePage/commons/CoinsComponent";
import MostReadComponent from "@/components/HomePage/commons/MostReadComponent";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import { DashboardLayoutProviderHome } from "@/context/DashboardLayoutContextHome";

interface ShowContentPageClientProps {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
  banners: IBannerReturn[];
  news: INewsReturn;
  mostReadNews: INewsReturn[];
  coins: ICoins;
  otherNews: INewsReturn[];
}

const ShowContentPageClient = ({
  news,
  banners,
  categories,
  coins,
  mostReadNews,
  weatherInfos,
  otherNews,
}: ShowContentPageClientProps) => {
  return (
    <DashboardLayoutProviderHome>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
      <main className="mt-24 md:mt-40 flex flex-col items-center justify-center mx-4 sm:mx-16">
        <SuperTopBannerComponent banners={banners} />
        <section className="max-w-[1295px] flex flex-col lg:flex-row gap-8 mt-10">
          <div className="max-w-[800px] flex flex-col items-center gap-8">
            <ShowContentNewsComponent news={news} />
            <OtherNewsComponent otherNews={otherNews} />
          </div>
          <div className="flex flex-col-reverse lg:flex-col gap-16">
            <div className="flex flex-col gap-16">
              <CoinsComponent coins={coins} />
              <SideBannerBannerComponent banners={banners} />
            </div>
            <MostReadComponent mostReadNews={mostReadNews} />
          </div>
        </section>
      </main>
      <FooterComponent />
    </DashboardLayoutProviderHome>
  );
};

export default ShowContentPageClient;
