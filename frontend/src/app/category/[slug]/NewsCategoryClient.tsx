"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { ICoins } from "@/@types/coins";
import { INewsReturn, IPaginate } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import SuperTopBannerComponent from "@/components/HomePage/Banners/SuperTopBannerComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import FooterComponent from "@/components/HomePage/FooterComponent";
import NewsCategoryComponent from "@/components/HomePage/News/NewsCategoryComponent";
import { DashboardLayoutProviderHome } from "@/context/DashboardLayoutContextHome";

interface NewsCategoryClientProps {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
  banners: IBannerReturn[];
  newsCategory: INewsReturn[];
  news: INewsReturn[];
  mostReadNews: INewsReturn[];
  coins: ICoins;
  pagination: IPaginate<INewsReturn>;
}

const NewsCategoryClient = ({
  categories,
  weatherInfos,
  banners,
  newsCategory,
  news,
  coins,
  mostReadNews,
  pagination,
}: NewsCategoryClientProps) => {
  return (
    <DashboardLayoutProviderHome>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
      <main className="flex flex-col items-center justify-center mt-28 md:mt-28 mx-4 sm:mx-12">
        <section className="w-full flex flex-col items-center justify-center mt-5">
          <SuperTopBannerComponent banners={banners} />
        </section>
        <section className="w-full flex flex-col items-center justify-center mt-5">
          <NewsCategoryComponent
            pagination={pagination}
            newsCategory={newsCategory}
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

export default NewsCategoryClient;
