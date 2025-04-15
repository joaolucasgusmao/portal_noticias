"use client";

import { INewsReturn } from "@/@types/news";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";

interface FeaturedNews {
  news: INewsReturn[];
}

const FeaturedNews = ({ news }: FeaturedNews) => {
  const [maxCharsSummary, setMaxCharsSummary] = useState<number>(92);
  const [maxCharsTitle, setMaxCharsTitle] = useState<number>(75);

  const sliderNews = news
    .filter((news) => news.is_fixed && news.is_active)
    .slice(0, 3);

  const sideNews = news
    .filter((news) => !news.is_fixed && news.is_active)
    .slice(0, 3);

  if (sliderNews.length === 0 && sideNews.length === 0) null;

  return (
    <section className="w-full flex items-center justify-center mt-5">
      <div className="w-full h-auto flex flex-col gap-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
          speed={500}
          className="pb-10! w-full h-[380px!]"
        >
          {sliderNews.map((news) => (
            <SwiperSlide key={news.id} className="w-full h-[350px!]">
              <img
                src={news.image}
                alt={news.caption}
                className="w-full h-full relative"
              />
              <div className="flex flex-col gap-2 absolute bottom-0 left-0 right-0 h-max p-2 bg-[linear-gradient(0deg,rgba(0,0,0,0.83)_34%,rgba(0,0,0,0.82)_35%,rgba(0,0,0,0.66)_68%,transparent_100%)]">
                <span className="text-white text-xs font-bold bg-[var(--orange)] w-max px-2 py-1 rounded-full">
                  {news.hat}
                </span>
                <h1 className="text-white font-bold text-xl">{news.title}</h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex flex-col gap-4 w-full">
          {sideNews.map((news) => (
            <>
              <div className="w-full h-auto flex flex-col gap-4 items-start">
                <div className="flex flex-row gap-4">
                  <img
                    src={news.image}
                    alt={news.caption}
                    className="w-full h-[120px] rounded-sm"
                  />
                  <div className="flex flex-col justify-between">
                    <span className="text-[var(--orange)] font-bold text-sm rounded-md">
                      {news.hat}
                    </span>
                    <h1 className="text-base font-bold">
                      {news.title.length > maxCharsTitle
                        ? news.title?.slice(0, maxCharsTitle) + "..."
                        : news.title}
                    </h1>
                  </div>
                </div>
                <p className="text-sm text-[var(--gray-2)] font-sans">
                  {news.summary
                    ? news.summary.length > maxCharsSummary
                      ? news.summary.slice(0, maxCharsSummary) + "..."
                      : news.summary
                    : ""}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;

{
  /* */
}
