import { INewsReturn } from "@/@types/news";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import CircleIcon from "@mui/icons-material/Circle";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface LastNewsComponentProps {
  news: INewsReturn[];
}

const LastNewsComponent = ({ news }: LastNewsComponentProps) => {
  const lastNews = news.filter((news) => news.is_active).slice(0, 5);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-xl text-[var(--black)]">
        Últimas notícias
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        {lastNews.map((news) => (
          <div className="flex flex-col gap-2 border-b-2 border-[var(--gray-2)] pb-2 last:border-none">
            <div className="flex flex-row items-center gap-2">
              <span className="font-bold text-sm">{news.hat}</span>
              <CircleIcon sx={{ fontSize: "6px", color: "var(--gray-2)" }} />
              <span className="text-sm font-medium text-[var(--black-4)]">
                {dayjs(news.created_at).fromNow()}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[var(--orange)]">
              {news.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastNewsComponent;
