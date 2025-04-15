"use client";

import { IBannerReturn } from "@/@types/banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TopBannerComponentProps {
  banners: IBannerReturn[];
}

const TopBannerComponent = ({ banners }: TopBannerComponentProps) => {
  const topBanners = banners.filter(
    (banner) => banner.positions.includes("top") && banner.is_active
  );

  if (topBanners.length === 0) return null;

  return (
    <section className="w-full h-auto relative flex items-center justify-center">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        speed={500}
        className="pb-8! md:pb-10! lg:pb-5! w-[1500px] h-auto"
      >
        {topBanners.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <div className="w-full h-auto lg:h-[350px] flex items-center justify-center">
                <img
                  src={banner.image}
                  alt={banner.description}
                  className="max-h-full object-contain cursor-pointer"
                  onClick={() => {
                    if (banner.link) {
                      window.open(banner.link, "_blank", "noopener,noreferrer");
                    }
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default TopBannerComponent;
