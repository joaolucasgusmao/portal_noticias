import { ICoins } from "@/@types/coins";
import { INewsReturn } from "@/@types/news";
import { useState } from "react";

import CoinsComponent from "../commons/CoinsComponent";
import LastNewsComponent from "../commons/LastNewsComponent";
import SideHomeBannerComponent from "../Banners/SideHomeBannerComponent";
import { IBannerReturn } from "@/@types/banner";
import MostReadComponent from "../commons/MostReadComponent";

interface HomeNewsComponentProps {
  news: INewsReturn[];
  coins: ICoins;
  banners: IBannerReturn[];
  mostReadNews: INewsReturn[];
}

const HomeNewsComponent = ({
  news,
  coins,
  banners,
  mostReadNews,
}: HomeNewsComponentProps) => {
  const [maxCharsSummary] = useState<number>(107);
  const [maxCharsTitle] = useState<number>(80);
  const homeNews = news.filter((newsItem) => newsItem.is_active).slice(0, 30);

  return (
    <div className="w-full max-w-[1295px] flex gap-28">
      <div className="flex flex-col gap-4">
        {homeNews.map((news) => (
          <div
            key={news.id}
            className="flex flex-col md:flex-row gap-4 border-b-2 border-[var(--gray-2)] last:border-none pb-4 lg:gap-6"
          >
            <img
              src={news.image}
              alt={news.caption}
              className="w-full h-[180px] object-cover rounded-md md:h-[200px] md:w-[300px]"
            />
            <div className="flex flex-col gap-4">
              <div className="flex gap-6 items-center">
                <span className="bg-[var(--gray-4)] px-2 py-1 rounded-full text-[var(--black)] text-sm font-sans">
                  {news.hat}
                </span>
                <span className="font-medium text-xs text-[var(--black-4)]">
                  Em{" "}
                  {news.categories.map((category) => category.name).join(", ")}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-bold text-[var(--orange)] lg:text-2xl">
                  {news.title.length > maxCharsTitle
                    ? `${news.title.slice(0, maxCharsTitle)}...`
                    : news.title}
                </h1>
                {news.summary && (
                  <p className="text-sm text-[var(--gray-3)] lg:text-base">
                    {news.summary.length > maxCharsSummary
                      ? `${news.summary.slice(0, maxCharsSummary)}...`
                      : news.summary}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden xl:flex flex-col gap-16">
        <CoinsComponent coins={coins} />
        <LastNewsComponent news={news} />
        <SideHomeBannerComponent banners={banners} />
        <MostReadComponent mostReadNews={mostReadNews} />
      </div>
    </div>
  );
};

export default HomeNewsComponent;
