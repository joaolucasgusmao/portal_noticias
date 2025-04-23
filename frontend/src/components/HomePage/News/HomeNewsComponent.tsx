import { ICoins } from "@/@types/coins";
import { INewsReturn } from "@/@types/news";
import { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface HomeNewsComponentProps {
  news: INewsReturn[];
  coins: ICoins;
}

const HomeNewsComponent = ({ news, coins }: HomeNewsComponentProps) => {
  const [maxCharsSummary] = useState<number>(107);
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
                <span className="bg-[var(--gray-4)] px-2 py-1 rounded-full text-[var(--black)] text-sm font-bold">
                  {news.hat}
                </span>
                <span className="font-medium text-xs text-[var(--black-4)]">
                  Em{" "}
                  {news.categories.map((category) => category.name).join(", ")}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-[var(--orange)] lg:text-2xl">
                  {news.title}
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
      <div className="hidden xl:flex xl:flex-col">
        <h1 className="font-bold text-lg text-[var(--black)] mb-2 text-center">
          Economia
        </h1>
        <div className="pt-2 w-[350px] h-[225px] border border-[var(--gray-2)]">
          <div className="flex items-center gap-16 justify-center">
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-[var(--black)] text-center">
                Dólar
              </h2>
              <p className="text-[0.900rem] font-bold text-[var(--black)] pl-2">
                {Number(coins.USDBRL.ask).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p
                className={`text-sm font-bold ${
                  Number(coins.USDBRL.pctChange) > 0
                    ? "text-[var(--green)]"
                    : Number(coins.USDBRL.pctChange) < 0
                    ? "text-[var(--red)]"
                    : "text-[var(--gray-3)]"
                }`}
              >
                {coins.USDBRL.pctChange &&
                Number(coins.USDBRL.pctChange) > 0 ? (
                  <>
                    <ExpandLessIcon
                      style={{
                        color: "text-[var(--green)]",
                        fontSize: "20px",
                      }}
                    />
                    +
                    {String(Number(coins.USDBRL.pctChange).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </>
                ) : coins.USDBRL.pctChange &&
                  Number(coins.USDBRL.pctChange) < 0 ? (
                  <>
                    <ExpandMoreIcon
                      style={{
                        color: "text-[var(--red)]",
                        fontSize: "20px",
                      }}
                    />
                    {String(Number(coins.USDBRL.pctChange).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </>
                ) : (
                  <>
                    <ChevronRightIcon
                      style={{
                        color: "text-[var(--gray)]",
                        fontSize: "20px",
                      }}
                    />
                    {String(Number(coins.USDBRL.pctChange).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </>
                )}
                %
              </p>
            </div>
            <div className="w-[1px] h-[100px] bg-[var(--gray-2)] rotate-45" />

            <div className="flex flex-col">
              <h2 className="text-base font-medium text-[var(--black)] text-center">
                Euro
              </h2>
              <p className="text-[0.900rem] font-bold text-[var(--black)] pl-2">
                {Number(coins.EURBRL.ask).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p
                className={`text-sm font-bold ${
                  Number(coins.EURBRL.pctChange) > 0
                    ? "text-[var(--green)]"
                    : Number(coins.EURBRL.pctChange) < 0
                    ? "text-[var(--red)]"
                    : "text-[var(--gray-3)]"
                }`}
              >
                {coins.EURBRL.pctChange &&
                Number(coins.EURBRL.pctChange) > 0 ? (
                  <>
                    <ExpandLessIcon
                      style={{
                        color: "text-[var(--green)]",
                        fontSize: "20px",
                      }}
                    />
                    +
                    {String(Number(coins.EURBRL.pctChange).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </>
                ) : coins.EURBRL.pctChange &&
                  Number(coins.EURBRL.pctChange) < 0 ? (
                  <>
                    <ExpandMoreIcon
                      style={{
                        color: "text-[var(--red)]",
                        fontSize: "20px",
                      }}
                    />
                    {String(Number(coins.EURBRL.pctChange).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </>
                ) : (
                  <>
                    <ChevronRightIcon
                      style={{
                        color: "text-[var(--gray-3)]",
                        fontSize: "20px",
                      }}
                    />
                    {String(Number(coins.EURBRL.pctChange).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </>
                )}
                %
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col mt-1 pt-6 border-t border-[var(--gray-2)]">
            <h2 className="text-base font-bold text-[var(--black)]">Bitcoin</h2>
            <p className="text-[0.900rem] font-bold text-[var(--black)]">
              {Number(coins.BTCBRL.ask).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p
              className={`text-sm font-bold ${
                Number(coins.BTCBRL.pctChange) > 0
                  ? "text-[var(--green)]"
                  : Number(coins.BTCBRL.pctChange) < 0
                  ? "text-[var(--red)]"
                  : "text-[var(--gray-3)]"
              }`}
            >
              {coins.BTCBRL.pctChange && Number(coins.BTCBRL.pctChange) > 0 ? (
                <>
                  <ExpandLessIcon
                    style={{
                      color: "text-[var(--green)]",
                      fontSize: "20px",
                    }}
                  />
                  +
                  {String(Number(coins.BTCBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              ) : coins.BTCBRL.pctChange &&
                Number(coins.BTCBRL.pctChange) < 0 ? (
                <>
                  <ExpandMoreIcon
                    style={{
                      color: "text-[var(--red)]",
                      fontSize: "20px",
                    }}
                  />
                  {String(Number(coins.BTCBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              ) : (
                <>
                  <ChevronRightIcon
                    style={{
                      color: "text-[var(--gray-3)]",
                      fontSize: "20px",
                    }}
                  />
                  {String(Number(coins.BTCBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              )}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNewsComponent;
