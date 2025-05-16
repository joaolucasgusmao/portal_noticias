import { INewsReturn } from "@/@types/news";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface OtherNewsComponentProps {
  otherNews: INewsReturn[];
}

const OtherNewsComponent = ({ otherNews }: OtherNewsComponentProps) => {
  const news = otherNews.filter((news) => news.is_active).slice(0, 6);
  const [maxCharsTitle] = useState<number>(80);
  const router = useRouter();

  return (
    <div className="w-full hidden xl:block">
      <h1 className="text-xl text-[var(--black)] font-bold">Outras Notícias</h1>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        slidesPerView={3}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        speed={500}
        spaceBetween={45}
        className="px-11! pt-6! relative [&_.swiper-button-prev]:top-[105px]! [&_.swiper-button-next]:top-[105px]!"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="w-fit h-fit flex flex-col gap-3 cursor-pointer"
              onClick={() => router.push(`/news/${item.slug}`)}
            >
              <Image
                src={item.image}
                alt="Imagem da notícia"
                width={500}
                height={500}
                className="rounded-md w-[230px] h-[140px]"
              />
              <div className="flex flex-col">
                <span className="text-sm text-[var(--orange)] font-medium">
                  {item.hat}
                </span>
                <h1 className="text-[var(--black)] text-base font-bold hover:underline">
                  {item.title.length > maxCharsTitle
                    ? `${item.title.slice(0, maxCharsTitle)}...`
                    : item.title}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OtherNewsComponent;
