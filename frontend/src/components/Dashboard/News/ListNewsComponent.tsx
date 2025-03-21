import { INewsReturn } from "@/@types/news";
import Link from "next/link";

interface ListNewsComponentProps {
  news: INewsReturn[];
}

const ListNewsComponent = ({ news }: ListNewsComponentProps) => {
  return (
    <div className="w-full mx-10">
      <div className="flex flex-row justify-between gap-8 my-4 items-center">
        <h1 className="text-2xl text-[var(--primary)] font-bold">
          Noticias cadastradas
        </h1>
        <Link
          className="text-base font-bold text-[var(--primary)] bg-[var(--black-2)] p-2 rounded-md border border-[var(--input-border)] 
             hover:bg-[var(--black-3)] hover:scale-105 transition-all duration-300"
          href={"/dashboard/news/create"}
        >
          Adicionar nova notícia
        </Link>
      </div>
      <div className="w-full border border-[var(--input-border)]">
        <div className="grid grid-cols-4 gap-4 p-2 bg-[var(--black-2)] text-[var(--primary)] font-bold border-b border-[var(--input-border)]">
          <h1 className="text-base">Título</h1>
          <h1 className="text-base hidden xl:block">Autor</h1>
          <h1 className="text-base hidden xl:block">Categoria(s)</h1>
          <h1 className="text-base hidden xl:block">Data</h1>
        </div>

        <ul className="bg-[var(--black-2)]">
          {news.length > 0 ? (
            news.map((newItem) => (
              <li
                key={newItem.id}
                className="grid grid-cols-1 xl:grid-cols-4 gap-4 border-b border-[var(--input-border)] h-20 p-4 items-center"
              >
                <h2 className="text-[var(--gray)] text-base font-semibold">
                  {newItem.title}
                </h2>
                <h2 className="text-[var(--gray)] text-sm font-semibold hidden xl:block">
                  {newItem.user.name}
                </h2>
                <h2 className="text-[var(--gray)] text-base font-semibold hidden xl:block">
                  {newItem.categories
                    .map((category) => category.name)
                    .join(", ")}
                </h2>
                <div className="flex-col gap-1 hidden xl:flex">
                  <h2 className="text-[var(--gray)] text-sm font-semibold hidden xl:block">
                    Publicado
                  </h2>
                  <span className="text-[var(--gray)] text-sm font-semibold hidden xl:block">
                    {newItem.created_at}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-[var(--primary)] text-2xl">
              Nenhuma notícia cadastrada!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListNewsComponent;
