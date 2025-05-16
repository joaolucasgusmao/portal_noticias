"use client";

import { ICoins } from "@/@types/coins";
import { INewsReturn, IPaginate } from "@/@types/news";
import { useState } from "react";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CoinsComponent from "../commons/CoinsComponent";
import LastNewsComponent from "../commons/LastNewsComponent";
import SideHomeBannerComponent from "../Banners/SideHomeBannerComponent";
import { IBannerReturn } from "@/@types/banner";
import MostReadComponent from "../commons/MostReadComponent";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface NewsCategoryComponentProps {
  newsCategory: INewsReturn[];
  news: INewsReturn[];
  coins: ICoins;
  banners: IBannerReturn[];
  mostReadNews: INewsReturn[];
  pagination: Omit<IPaginate<INewsReturn>, "data">;
}

const NewsCategoryComponent = ({
  newsCategory,
  news,
  coins,
  banners,
  mostReadNews,
  pagination,
}: NewsCategoryComponentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { meta } = pagination;

  const [maxCharsSummary] = useState<number>(107);
  const [maxCharsTitle] = useState<number>(80);
  const slug = params.slug as string;
  const currentPage = Number(searchParams.get("page")) || 1;

  const newsByCategory = newsCategory
    .filter((newsItem) => newsItem.is_active)
    .slice(0, 30);

  const goToPage = (page: number) => {
    router.push(`/category/${slug}?page=${page}`);
  };

  return (
    <div className="w-full max-w-[1295px] flex gap-28">
      {newsByCategory.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl text-[var(--orange)] font-bold">
            {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
          <div className="flex flex-col gap-4">
            {newsByCategory.map((news) => (
              <div
                key={news.id}
                className="flex flex-col md:flex-row gap-4 border-b-2 border-[var(--gray-2)] last:border-none pb-4 lg:gap-6 cursor-pointer"
                onClick={() => {
                  router.push(`/news/${news.slug}`);
                }}
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
                      {news.categories
                        .map((category) => category.name)
                        .join(", ")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold text-[var(--orange)] lg:text-2xl hover:underline">
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

          <div className="flex gap-4 justify-start items-center sm:justify-end mt-10">
            {meta.current_page > 1 && (
              <a onClick={() => goToPage(currentPage - 1)}>
                <ArrowCircleLeftIcon
                  sx={{
                    fontSize: "2rem",
                    color: "var(--orange)",
                    cursor: "pointer",
                    transition:
                      "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                    "&:hover": {
                      color: "var(--orange)",
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </a>
            )}

            <span className="text-[var(--orange)] text-base font-bold">
              Página {meta.current_page} de {meta.last_page} | Total:{" "}
              {meta.total}
            </span>

            {meta.current_page < meta.last_page && (
              <a onClick={() => goToPage(currentPage + 1)}>
                <ArrowCircleRightIcon
                  sx={{
                    fontSize: "2rem",
                    color: "var(--orange)",
                    cursor: "pointer",
                    transition:
                      "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                    "&:hover": {
                      color: "var(--orange)",
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex mt-8">
          <h1 className="text-2xl text-[var(--orange)] font-bold">
            Nenhuma Notícia cadastrada!
          </h1>
        </div>
      )}

      {newsByCategory.length > 0 ? (
        <div className="hidden xl:flex flex-col gap-16">
          <CoinsComponent coins={coins} />
          {/* <LastNewsComponent news={news} /> */}
          <SideHomeBannerComponent banners={banners} />
          <MostReadComponent mostReadNews={mostReadNews} />
        </div>
      ) : null}
    </div>
  );
};

export default NewsCategoryComponent;
