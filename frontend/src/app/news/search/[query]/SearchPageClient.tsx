"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { ICoins } from "@/@types/coins";
import { INewsReturn, IPaginate } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import SuperTopBannerComponent from "@/components/HomePage/Banners/SuperTopBannerComponent";
import FooterComponent from "@/components/HomePage/FooterComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import NewsCategoryComponent from "@/components/HomePage/News/NewsCategoryComponent";
import SidebarHomeComponent from "@/components/HomePage/Sidebar/SidebarHomeComponent";
import { DashboardLayoutProviderHome } from "@/context/DashboardLayoutContextHome";

interface SearchPageClientProps {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
  banners: IBannerReturn[];
  mostReadNews: INewsReturn[];
  coins: ICoins;
  newsByTitle: INewsReturn[];
  pagination: IPaginate<INewsReturn>;
  title?: string;
}

const SearchPageClient = ({
  banners,
  categories,
  coins,
  mostReadNews,
  weatherInfos,
  newsByTitle,
  pagination,
  title,
}: SearchPageClientProps) => {
  return (
    <DashboardLayoutProviderHome>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
      <SidebarHomeComponent categories={categories} />
      <main className="mt-24 md:mt-40 flex flex-col items-center justify-center mx-4 sm:mx-16">
        <section className="w-full flex flex-col items-center justify-center mt-5">
          <SuperTopBannerComponent banners={banners} />
        </section>
        <section className="w-full flex flex-col items-center justify-center mt-5">
          <NewsCategoryComponent
            newsCategory={newsByTitle}
            banners={banners}
            coins={coins}
            mostReadNews={mostReadNews}
            pagination={pagination}
            titleSearch={title}
          />
        </section>
      </main>
      <FooterComponent />
    </DashboardLayoutProviderHome>
  );
};

export default SearchPageClient;
