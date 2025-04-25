import { INewsReturn } from "@/@types/news";
import { useRouter } from "next/navigation";

interface MostReadComponentProps {
  mostReadNews: INewsReturn[];
}

const MostReadComponent = ({ mostReadNews }: MostReadComponentProps) => {
  const news = mostReadNews
    .filter((newsItem) => newsItem.is_active)
    .slice(0, 5);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-[var(--black)]">Mais lidas</h1>
      <div className="flex flex-col gap-4">
        {news.map((newsItem, index) => (
          <div
            className="flex flex-row gap-4 pb-2 items-center border-b-2 border-[var(--gray-2)] last:border-none cursor-pointer"
            key={newsItem.id}
            onClick={() => router.push(`/news/${newsItem.slug}`)}
          >
            <h2 className="text-3xl text-[var(--black)] font-serif">
              {index + 1}
            </h2>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-sans text-[var(--black)]">
                {newsItem.hat}
              </span>
              <h1 className="text-lg font-bold text-[var(--orange)] hover:underline">
                {newsItem.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostReadComponent;
