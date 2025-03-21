import Image from "next/image";
import { INewsReturn } from "@/@types/news";

interface ListNewsComponentProps {
  news: INewsReturn[];
}

const ListNewsComponent = ({ news }: ListNewsComponentProps) => {
  return (
    <ul className="ml-10">
      {news.length > 0 ? (
        news.map((newItem) => (
          <li key={newItem.id}>
            <span className="text-white text-base">{newItem.hat}</span>
            <h1 className="text-2xl text-white">{newItem.title}</h1>
            <p className="text-white text-base">{newItem.summary}</p>
            <Image
              src={newItem.image}
              alt={newItem.title}
              width={300}
              height={300}
            />
            <span className="text-base text-white">{newItem.caption}</span>
            {newItem.topics?.map((topic) => (
              <span key={topic} className="text-white text-base">
                {topic}
              </span>
            ))}
            <p className="text-base text-white">{newItem.content}</p>
          </li>
        ))
      ) : (
        <p>Nenhuma notícia encontrada</p>
      )}
    </ul>
  );
};

export default ListNewsComponent;
