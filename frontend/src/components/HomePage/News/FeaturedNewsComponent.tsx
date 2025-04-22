"use client";

import { INewsReturn } from "@/@types/news";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";

interface FeaturedNewsComponentProps {
  news: INewsReturn[];
}

const FeaturedNewsComponent = ({ news }: FeaturedNewsComponentProps) => {
  const [maxCharsSummary] = useState<number>(107);
  const [maxCharsTitle] = useState<number>(135);

  let sliderNews = news
    .filter((news) => news.is_fixed && news.is_active)
    .slice(0, 3);

  if (sliderNews.length === 0) {
    sliderNews = news
      .filter((news) => news.is_active && !news.is_fixed)
      .slice(0, 3);
  }

  const sideNews = news
    .filter(
      (newsItem) =>
        !newsItem.is_fixed &&
        newsItem.is_active &&
        !sliderNews.some((sliderItem) => sliderItem.id === newsItem.id)
    )
    .slice(0, 2);

  return (
    <div className="w-full max-w-[1295px] flex flex-col lg:flex-row gap-16 xl:gap-20">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop
        slidesPerView={1}
        pagination={{ clickable: true }}
        speed={500}
        spaceBetween={0}
        className="w-full h-[280px] lg:w-[780px] lg:h-[400px] rounded-md"
      >
        {sliderNews.map((news) => (
          <SwiperSlide
            key={news.id}
            className="w-full h-[380px] lg:h-[530px] relative"
          >
            <img
              src={news.image}
              alt={news.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 h-[10.5rem] sm:h-36 md:h-32 left-0 right-0 flex flex-col gap-2 p-4 bg-gradient-to-t from-black/85 via-black/70 to-transparent">
              <span className="text-white text-sm font-bold bg-[var(--orange)] w-max px-2 py-1 rounded-full">
                {news.hat}
              </span>
              <h1 className="text-white font-bold text-xl">
                {news.title.length > maxCharsTitle
                  ? `${news.title.slice(0, maxCharsTitle)}...`
                  : news.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col gap-6 w-full lg:w-[440px]">
        {sideNews.map((news) => (
          <div
            key={news.id}
            className="flex flex-col gap-2 border-b-2 pb-4 border-[var(--gray-2)] last:border-none"
          >
            <div className="flex flex-row gap-4 items-start">
              <img
                src={news.image}
                alt={news.caption}
                className="w-[200px] h-[120px] sm:h-[150px] sm:w-[250px] md:w-[180px] md:h-[127px] object-cover rounded-md"
              />
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[var(--orange)] font-bold text-sm sm:text-base lg:text-sm xl:text-base rounded-md">
                  {news.hat}
                </span>
                <h2 className="text-sm font-bold sm:text-xl lg:text-sm xl:text-base">
                  {news.title.length > maxCharsTitle
                    ? `${news.title.slice(0, maxCharsTitle)}...`
                    : news.title}
                </h2>
                {news.summary && (
                  <p className="text-sm sm:text-base text-[var(--gray-3)] font-sans hidden md:block lg:hidden">
                    {news.summary.length > maxCharsSummary
                      ? `${news.summary.slice(0, maxCharsSummary)}...`
                      : news.summary}
                  </p>
                )}
              </div>
            </div>
            {news.summary && (
              <p className="text-sm sm:text-base lg:text-sm xl:text-base text-[var(--gray-3)] font-sans md:hidden lg:block">
                {news.summary.length > maxCharsSummary
                  ? `${news.summary.slice(0, maxCharsSummary)}...`
                  : news.summary}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedNewsComponent;
