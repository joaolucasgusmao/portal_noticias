import { useState } from "react";
import InputComponent from "../../commons/InputComponent";
import ButtonComponent from "../../commons/ButtonComponent";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ICategoryReturn, ICreateCategory } from "@/@types/category";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

interface CategoriesListComponentProps {
  categories: ICategoryReturn[];
}

const CategoriesListComponent = ({
  categories,
}: CategoriesListComponentProps) => {
  const [formData, setFormData] = useState<ICreateCategory>({
    name: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [buttonText, setButtonText] = useState<string>("Criar");

  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          onClose: () => {
            router.refresh();
          },
        });
        setFormData({
          name: "",
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar notícia!"
      );
    }
  };

  const handleGetCategories = async () => {
    if (!selectedCategoryId) return;

    try {
      const response = await fetch(`/api/categories/${selectedCategoryId}`, {
        method: "GET",
      });

      setButtonText("Editar");

      const data = await response.json();

      if (response.ok) {
        setAnchorEl(null);
        setFormData({ name: data.name });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      error instanceof Error ? error.message : "Erro ao obter Categoria!";
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    if (!selectedCategoryId) return;

    event.preventDefault();

    try {
      const response = await fetch(`/api/categories/${selectedCategoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          onClose: () => {
            setFormData({
              name: "",
            });
            router.refresh();
            setSelectedCategoryId(null);
            setButtonText("Criar");
          },
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      error instanceof Error ? error.message : "Erro ao atualizar Categoria!";
    }
  };

  const handleDelete = async () => {
    if (!selectedCategoryId) return;

    try {
      const response = await fetch(`/api/categories/${selectedCategoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          onClose: () => {
            router.refresh();
            setAnchorEl(null);
          },
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao deletar Categoria!"
      );
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    categoryId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(categoryId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCategoryId(null);
  };

  return (
    <>
      <section className="flex flex-col xl:flex-row w-full justify-between gap-16 p-4 mx-4 items-center bg-[var(--black-2)] my-20 lg:mx-16">
        <form
          onSubmit={selectedCategoryId ? handleUpdate : handleSubmit}
          className="flex w-full 2xl:w-4/12 h-96 justify-center flex-col items-center border border-[var(--input-border)]"
        >
          <div className="flex flex-col gap-6 w-11/12 bg-[var(--black-2)] items-center">
            <h1 className="text-[var(--primary)] font-bold! text-xl!">
              Nova Categoria
            </h1>
            <div className="flex flex-col gap-3 items-center w-full">
              <InputComponent
                label="Nome da categoria"
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
                className="w-10/12! lg:w-8/12! mb-0! bg-[var(--black-2)]!"
                sx={{
                  "& .MuiInputLabel-shrink": {
                    backgroundColor: "var(--black-2)",
                    padding: "0 6px",
                  },
                }}
              />
              <ButtonComponent
                type="submit"
                label={buttonText}
                className="w-10/12! lg:w-8/12!"
              />
            </div>
          </div>
        </form>
        {categories.length > 0 ? (
          <div className="w-full flex flex-col 2xl:w-7/12">
            <div className="grid grid-cols-2 p-1 bg-[var(--black-2)] text-[var(--primary)] font-bold border border-[var(--input-border)] border-b-0">
              <h1 className="w-fit text-base text-center sm:text-left px-2">
                Título
              </h1>
            </div>

            <ul className="w-full bg-[var(--black-2)] border border-[var(--input-border)]">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="w-full grid h-14 px-4 grid-cols-1 items-center border-b border-[var(--input-border)] last:border-b-0"
                >
                  <div className="flex w-full justify-between items-center">
                    <h2 className="text-xs text-[var(--gray)] lg:text-base font-semibold">
                      {category.name}
                    </h2>
                    <IconButton
                      onClick={(event) => handleMenuClick(event, category.id)}
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
                </li>
              ))}
            </ul>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  backgroundColor: "var(--black-2)",
                  marginLeft: { xs: "-1rem", sm: "-3.5rem !important" },
                  height: "fit-content",
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
                onClick={handleGetCategories}
              >
                Editar Categoria
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
                Excluir Categoria
              </MenuItem>
            </Menu>
            <span className="mt-4 text-center md:text-right text-base font-bold text-[var(--primary)]">
              Total: {categories.length}
            </span>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default CategoriesListComponent;
