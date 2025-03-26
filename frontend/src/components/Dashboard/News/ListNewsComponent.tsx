import { INewsReturn, IPaginate } from "@/@types/news";
import Link from "next/link";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import ButtonComponent from "../commons/ButtonComponent";
import { ICategory } from "@/@types/category";
import useGetCategories from "@/hooks/useGetCategories";

interface ListNewsComponentProps {
  news: INewsReturn[];
  pagination: Omit<IPaginate<INewsReturn>, "data">;
}

const ListNewsComponent = ({ news, pagination }: ListNewsComponentProps) => {
  const { meta } = pagination;
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("categoryId") || null
  );

  const { categories, loading, error } = useGetCategories();

  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());

    if (selectedCategory) {
      params.set("categoryId", selectedCategory);
      router.push(
        `/dashboard/news/category/${selectedCategory}/?${params.toString()}`
      );
    } else {
      router.push(`/dashboard/news/?${params.toString()}`);
    }
  };

  const [maxChars, setMaxChars] = useState(80);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleResize = () => {
      setMaxChars(window.innerWidth >= 640 ? 80 : 70);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    newsId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedNewsId(newsId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedNewsId(null);
  };

  const handleEdit = () => {
    if (selectedNewsId) {
      router.push(`/dashboard/news/edit/${selectedNewsId}`);
    }
    handleClose();
  };

  const handleDelete = async () => {
    if (!selectedNewsId) return;

    try {
      const response = await fetch(`/api/news/${selectedNewsId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, {
          onClose: () => {
            router.refresh();
          },
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro interno do servidor.");
    }
    handleClose();
  };

  return news.length > 0 ? (
    <section className="w-full mx-10 mb-10">
      <div className="flex flex-row justify-between gap-8 my-4 items-center">
        {/* <h1 className="text-base lg:text-2xl text-[var(--primary)] font-bold">
          Notícias cadastradas
        </h1> */}
        <Select
          value={selectedCategory || ""}
          onChange={(event) => {
            const newCategory = event.target.value;
            setSelectedCategory(newCategory);
            router.push(`/dashboard/news?page=1&categoryId=${newCategory}`);
          }}
          displayEmpty
          sx={{
            backgroundColor: "var(--black-2)",
            borderRadius: "8px",
            padding: "5px 8px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "1px solid",
            borderColor: "var(--input-border)",
            color: "var(--primary)",
            height: "2.5rem",
            "& .MuiSelect-icon": {
              right: 8,
              color: "var(--primary)",
            },
            "&.Mui-focused, &:focus, &:active": {
              borderColor: "var(--input-border) !important",
              backgroundColor: "var(--black-2) !important",
              boxShadow: "none !important",
              outline: "none !important",
            },
          }}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
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
              className="grid h-28 p-4 grid-cols-2 xl:grid-cols-5 xl:h-36! 2xl:h-32! gap-4 border-t border-[var(--input-border)] items-center first:border-t-0"
            >
              <h2 className="text-left text-xs w-full text-[var(--gray)] lg:text-base font-semibold h-fit">
                {newItem.title.length > maxChars
                  ? newItem.title.slice(0, maxChars) + "..."
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

              <div className="flex w-full h-fit justify-center items-center gap-4 xl:gap-8 2xl:gap-20">
                <h2 className="text-[var(--gray)] xl:text-base font-semibold hidden xl:block w-full whitespace-nowrap">
                  {newItem.created_at}
                </h2>
                <div className="flex w-full justify-end xl:justify-normal">
                  <IconButton
                    onClick={(event) => handleMenuClick(event, newItem.id)}
                  >
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
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 justify-start items-center sm:justify-end mt-10">
        {meta.current_page > 1 && (
          <a onClick={() => goToPage(currentPage - 1)}>
            <ArrowCircleLeftIcon
              sx={{
                fontSize: "2rem",
                color: "var(--primary)",
                cursor: "pointer",
                transition:
                  "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                "&:hover": {
                  color: "var(--primary)",
                  transform: "scale(1.05)",
                },
              }}
            />
          </a>
        )}

        <span className="text-[var(--primary)] text-base font-bold">
          Página {meta.current_page} de {meta.last_page} | Total: {meta.total}
        </span>

        {meta.current_page < meta.last_page && (
          <a onClick={() => goToPage(currentPage + 1)}>
            <ArrowCircleRightIcon
              sx={{
                fontSize: "2rem",
                color: "var(--primary)",
                cursor: "pointer",
                transition:
                  "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                "&:hover": {
                  color: "var(--primary)",
                  transform: "scale(1.05)",
                },
              }}
            />
          </a>
        )}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "var(--black-2)",
            marginLeft: "-1.6rem !important",
            marginTop: "0.7rem",
            width: { xs: "8rem", sm: "9rem" },
          },
        }}
      >
        <MenuItem
          sx={{
            color: "var(--primary)",
            fontWeight: "medium",
            fontSize: "1rem",
            transition:
              "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "var(--black-3)",
              transform: "scale(1.02)",
            },
            "&:active": {
              backgroundColor: "var(--black-3)",
              transform: "scale(0.98)",
            },
          }}
          onClick={handleEdit}
        >
          Editar Notícia
        </MenuItem>
        <MenuItem
          sx={{
            color: "var(--primary)",
            fontWeight: "medium",
            fontSize: "1rem",
            transition:
              "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "var(--black-3)",
              transform: "scale(1.02)",
            },
            "&:active": {
              backgroundColor: "var(--black-3)",
              transform: "scale(0.98)",
            },
          }}
          onClick={handleDelete}
        >
          Excluir Notícia
        </MenuItem>
      </Menu>
    </section>
  ) : (
    <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between gap-4 w-full  mx-5">
      <p className="text-2xl font-bold text-[var(--primary)]">
        Nenhuma Notícia cadastrada!
      </p>
      <Link
        className="w-32 text-center sm:max-w-none text-base font-bold text-[var(--primary)] bg-[var(--black-2)] p-2 rounded-md border border-[var(--input-border)] 
             hover:bg-[var(--black-3)] hover:scale-105 transition-all duration-300"
        href={"/dashboard/news/create"}
      >
        Criar notícia
      </Link>
    </div>
  );
};

export default ListNewsComponent;
