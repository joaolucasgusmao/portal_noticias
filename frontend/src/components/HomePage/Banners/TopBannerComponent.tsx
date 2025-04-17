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
    <section className="w-full flex justify-center mt-5">
      <div className="w-full max-w-[1500px]">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={true}
          navigation={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
          speed={500}
          className="pb-8! md:pb-10! lg:pb-3! h-auto"
        >
          {topBanners.map((banner) => (
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
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopBannerComponent;
