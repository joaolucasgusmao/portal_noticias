import { INewsReturn, IPaginate } from "@/@types/news";
import Link from "next/link";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormControl, IconButton, Menu, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import useGetCategories from "@/hooks/useGetCategories";
import InputComponent from "../commons/InputComponent";

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

  return (
    <section className="w-full mx-10 mb-10">
      {news.length > 0 && (
        <h2 className="text-[var(--primary)] font-bold text-2xl text-center">
          Notícias cadastradas.
        </h2>
      )}

      <div className="flex flex-row justify-between gap-8 my-4 items-center">
        <div className="flex flex-col gap-[0.4rem]">
          <span className="text-[var(--primary)] font-bold text-sm">
            Filtrar por categorias
          </span>
          <Select
            value={selectedCategory || ""}
            onChange={(event) => {
              const newCategory = event.target.value;
              setSelectedCategory(newCategory);
              router.push(`/dashboard/news?page=1&categoryId=${newCategory}`);
            }}
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "var(--black-2)",
                  borderRadius: "8px",
                  padding: "5px 8px",
                  boxShadow: "none",
                  "& .MuiMenuItem-root": {
                    backgroundColor: "var(--black-2)",
                    color: "var(--primary)",
                    transition: "all 0.3s ease-in-out",
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "var(--black-3)",
                    transform: "scale(1.05)",
                  },
                },
              },
            }}
            sx={{
              backgroundColor: "var(--black-2)",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "1px solid",
              borderColor: "var(--input-border)",
              color: "var(--primary)",
              height: "2.5rem",
              width: "fit-content",
              "& .MuiSelect-icon": {
                right: 8,
                color: "var(--primary)",
              },
              "&.Mui-focused": {
                border: "none !important",
                borderColor: "none !important",
                backgroundColor: "none !important",
                boxShadow: "none !important",
                outline: "none !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--input-border) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "none !important",
              },
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <MenuItem
              value=""
              sx={{
                backgroundColor: "var(--black-2) !important",
                "&:hover": {
                  backgroundColor: "var(--black-3) !important",
                  transform: "scale(1.05)",
                },
              }}
            >
              {loading ? "Carregando..." : "Todas"}
            </MenuItem>
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--black-3)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {loading ? "Carregando..." : category.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <InputComponent
          label="Pesquisar"
          type="text"
          name="title"
          className="w-40! m-0! p-0"
          // // sx={{
          // //   "& .MuiInputBase-input": {
          // //     color: "var(--gray)",
          // //     fontSize: "1rem",
          // //     height: "10px", // Defina uma altura fixa para o campo
          // //   },
          // }}
        />
      </div>
      {news.length > 0 ? (
        <>
          <div className="w-full border border-[var(--input-border)]">
            <div className="grid grid-cols-1 sm:grid-cols-5  p-2 bg-[var(--black-2)] text-[var(--primary)] font-bold border-b border-[var(--input-border)]">
              <h1 className="w-fit text-base text-center sm:text-left">
                Título
              </h1>
              <h1 className="w-fit text-base hidden xl:block ml-16 text-left">
                Status
              </h1>
              <h1 className="w-fit text-base hidden xl:block text-left">
                Autor
              </h1>
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
                    {newItem.categories
                      .map((category) => category.name)
                      .join(", ")}
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
              Página {meta.current_page} de {meta.last_page} | Total:{" "}
              {meta.total}
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
        </>
      ) : (
        <h2 className="text-[var(--primary)] font-bold text-2xl mt-10">
          Não há notícias cadastradas.
        </h2>
      )}
    </section>
  );
};

export default ListNewsComponent;
