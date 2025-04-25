"use client";

import { IBannerReturn } from "@/@types/banner";
import { ICategoryReturn } from "@/@types/category";
import { ICoins } from "@/@types/coins";
import { INewsReturn } from "@/@types/news";
import { IWeather } from "@/@types/weather";
import SideBannerBannerComponent from "@/components/HomePage/Banners/SideBannerComponent";
import SuperTopBannerComponent from "@/components/HomePage/Banners/SuperTopBannerComponent";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import CoinsComponent from "@/components/HomePage/commons/CoinsComponent";
import MostReadComponent from "@/components/HomePage/commons/MostReadComponent";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import Image from "next/image";
import { LuCamera } from "react-icons/lu";

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
      <main className="mt-28 md:mt-40 flex flex-col items-center justify-center mx-4">
        <SuperTopBannerComponent banners={banners} />
        <section className="max-w-[1295px] flex flex-col lg:flex-row gap-20 mt-10 mx-4">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2 border-b-1 border-[var(--gray-2)] pb-3">
              {news.hat ? (
                <span className="text-sm 2xl:text-base text-[var(--orange)] uppercase font-bold">
                  {news.hat}
                </span>
              ) : null}
              <h1 className="text-xl 2xl:text-3xl font-bold text-[var(--black)] text-left 2xl:text-center">
                {news.title}
              </h1>
              {news.summary ? (
                <p className="text-base text-[var(--black)] font-sans">
                  {news.summary}
                </p>
              ) : null}
            </div>
            <div className="w-full 2xl:w-[800px] flex flex-col ">
              <Image
                src={news.image}
                alt="Imagem de capa"
                width={800}
                height={500}
                className="w-full h-[250px] sm:h-[400px] md:h-[450px] lg:h-[500px] 2xl:w-[800px] 2xl:h-[500px] rounded-t-md"
              />
              {news.caption ? (
                <div className="w-full bg-[var(--gray-5)] flex items-center justify-center gap-3 2xl:gap-2 py-2 px-4 2xl:px-8 rounded-b-md">
                  <LuCamera className="text-[var(--black-4)] w-[50px] h-[50px] 2xl:w-[25px] 2xl:h-[25px]" />
                  <span className="text-sm font-light text-[var(--black-4)] leading-5 2xl:leading-[1.110rem]">
                    {news.caption}
                  </span>
                </div>
              ) : null}
            </div>
            <p className="w-full 2xl:w-[800px] text-[var(--black)] text-base font-medium">
              {news.content}
            </p>
          </div>
          <div className="flex flex-col gap-16">
            <CoinsComponent coins={coins} />
            <MostReadComponent mostReadNews={mostReadNews} />
            <SideBannerBannerComponent banners={banners} />
          </div>
        </section>
      </main>
    </DashboardLayoutProvider>
  );
};

export default ShowContentPageClient;
