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
import FooterComponent from "@/components/HomePage/FooterComponent";
import { DashboardLayoutProviderHome } from "@/context/DashboardLayoutContextHome";
import SidebarHomeComponent from "@/components/HomePage/Sidebar/SidebarHomeComponent";

interface HomePageInfosClient {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
  banners: IBannerReturn[];
  news: INewsReturn[];
  mostReadNews: INewsReturn[];
  coins: ICoins;
  newsByTitle: INewsReturn[];
}

const HomePageInfosClient = ({
  categories,
  weatherInfos,
  banners,
  news,
  coins,
  mostReadNews,
  newsByTitle,
}: HomePageInfosClient) => {
  return (
    <DashboardLayoutProviderHome>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
      <SidebarHomeComponent categories={categories} />
      <main className="flex flex-col items-center justify-center mt-16 md:mt-28 mx-4 sm:mx-12">
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
      <FooterComponent />
    </DashboardLayoutProviderHome>
  );
};

export default HomePageInfosClient;
