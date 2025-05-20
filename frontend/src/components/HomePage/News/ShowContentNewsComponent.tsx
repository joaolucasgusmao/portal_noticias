import { INewsReturn } from "@/@types/news";
import Image from "next/image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

interface ShowContentNewsComponentProps {
  news: INewsReturn;
}

const ShowContentNewsComponent = ({ news }: ShowContentNewsComponentProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 border-b-1 border-[var(--gray-2)] pb-3">
        {news.hat ? (
          <span className="text-sm sm:text-base text-[var(--orange)] uppercase font-bold">
            {news.hat}
          </span>
        ) : null}
        <h1 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-[var(--black)] text-left">
          {news.title}
        </h1>
        {news.summary ? (
          <p className="text-base text-[var(--black)] font-sans">
            {news.summary}
          </p>
        ) : null}
      </div>
      <div className="w-full 2xl:w-[800px] flex flex-col ">
        <Image
          src={news.image}
          alt="Imagem de capa"
          width={800}
          height={500}
          className="w-full h-[260px] sm:h-[350px] md:h-[450px] lg:h-[300px] xl:w-[800px] xl:h-[500px] rounded-t-md"
        />
        {news.caption ? (
          <div className="w-full bg-[var(--gray-5)] flex items-center justify-center gap-3 2xl:gap-2 py-2 px-4 2xl:px-8 rounded-b-md">
            <CameraAltIcon
              sx={{ fontSize: "1.1rem", color: "var(--black-4)" }}
            />
            <span className="text-sm font-light text-[var(--black-4)] leading-4 sm:leading-[1.110rem]">
              {news.caption}
            </span>
          </div>
        ) : null}
      </div>
      <p className="w-full 2xl:w-[800px] text-[var(--black)] text-base font-medium">
        {news.content}
      </p>

      {(news.topics ?? []).length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 items-center">
            <TurnedInIcon
              sx={{
                fontSize: "1rem",
                color: "var(--black-4)",
              }}
            />
            <h2 className="text-sm text-[var(--black)] font-bold">Tópicos</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(news.topics ?? []).map((topic, index) => (
              <span
                className="bg-[var(--orange)] text-xs text-[var(--white)] font-medium px-3 py-1 rounded-full cursor-pointer"
                key={index}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowContentNewsComponent;
