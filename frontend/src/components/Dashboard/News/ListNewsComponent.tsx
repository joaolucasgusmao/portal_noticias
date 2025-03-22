import { INewsReturn } from "@/@types/news";
import Link from "next/link";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

interface ListNewsComponentProps {
  news: INewsReturn[];
}

const ListNewsComponent = ({ news }: ListNewsComponentProps) => {
  return news.length > 0 ? (
    <section className="w-full mx-10 mb-20">
      <div className="flex flex-row justify-between gap-8 my-4 items-center">
        <h1 className="text-base lg:text-2xl text-[var(--primary)] font-bold">
          Noticias cadastradas
        </h1>
        <Link
          className="w-32 text-center md:w-32 text-xs xl md:text-base font-bold text-[var(--primary)] bg-[var(--black-2)] p-2 rounded-md border border-[var(--input-border)] 
             hover:bg-[var(--black-3)] hover:scale-105 transition-all duration-300"
          href={"/dashboard/news/create"}
        >
          Criar Notícia
        </Link>
      </div>
      <div className="w-full border border-[var(--input-border)]">
        <div className="grid grid-cols-1 sm:grid-cols-5  p-2 bg-[var(--black-2)] text-[var(--primary)] font-bold border-b border-[var(--input-border)]">
          <h1 className="w-fit text-base text-center sm:text-left">Título</h1>
          <h1 className="w-fit text-base hidden xl:block ml-16 text-left">
            Status
          </h1>
          <h1 className="w-fit text-base hidden xl:block text-left">Autor</h1>
          <h1 className="w-fit text-base hidden xl:block text-left">
            Categoria(s)
          </h1>
          <h1 className="w-fit text-base hidden xl:block text-left">
            Data de Publicação
          </h1>
          <h1 className="w-fit text-base hidden xl:block text-left"></h1>
        </div>

        <ul className="bg-[var(--black-2)]">
          {news.map((newItem) => (
            <li
              key={newItem.id}
              className="grid h-24 p-4 grid-cols-2 xl:grid-cols-5 xl:h-36! 2xl:h-28! xl:pb-6 gap-4 border-t border-[var(--input-border)] items-center first:border-t-0"
            >
              <h2 className="text-left text-xs w-full text-[var(--gray)] sm:text-base font-semibold h-fit">
                {newItem.title.length > 80
                  ? newItem.title.slice(0, 80) + "..."
                  : newItem.title}
              </h2>

              <h2 className="text-[var(--gray)] text-sm font-semibold hidden xl:block ml-16 text-left">
                {newItem.is_draft ? (
                  <span className="text-[var(--primary)] font-bold text-base text-left">
                    A Revisar
                  </span>
                ) : newItem.is_active && newItem.is_fixed ? (
                  "Destacado"
                ) : newItem.is_active ? (
                  "Publicado"
                ) : null}
              </h2>

              <h2 className="text-[var(--gray)] text-sm font-semibold hidden xl:block text-left">
                {newItem.user.name}
              </h2>

              <h2 className="text-[var(--gray)] text-base font-semibold hidden xl:block text-left">
                {newItem.categories.map((category) => category.name).join(", ")}
              </h2>

              <div className="flex w-full h-fit justify-center items-center gap-4 xl:gap-20">
                <h2 className="text-[var(--gray)] xl:text-base font-semibold hidden xl:block w-full whitespace-nowrap">
                  {newItem.created_at}
                </h2>
                <div className="flex w-full justify-end xl:justify-normal">
                  <MoreVertRoundedIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "var(--gray)",
                      cursor: "pointer",
                      transition:
                        "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                      "&:hover": {
                        color: "var(--primary)",
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ) : (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full  mx-5">
      <p className="text-2xl font-bold text-[var(--primary)]">
        Nenhuma Notícia cadastrada!
      </p>
      <Link
        className="w-48 sm:max-w-none text-base font-bold text-[var(--primary)] bg-[var(--black-2)] p-2 rounded-md border border-[var(--input-border)] 
             hover:bg-[var(--black-3)] hover:scale-105 transition-all duration-300"
        href={"/dashboard/news/create"}
      >
        Adicionar nova notícia
      </Link>
    </div>
  );
};

export default ListNewsComponent;
