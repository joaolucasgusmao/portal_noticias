import { IBannerCreate, IBannerReturn } from "@/@types/banner";
import {
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import InputComponent from "../../commons/InputComponent";
import ButtonComponent from "../../commons/ButtonComponent";
import Checkbox from "../../commons/CheckboxComponent";

interface BannersListComponentProps {
  banners: IBannerReturn[];
}

const BannersListComponent = ({ banners }: BannersListComponentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBannerId, setSelectedBannerId] = useState<number | null>(null);
  const [maxChars, setMaxChars] = useState(80);
  const [formData, setFormData] = useState<IBannerCreate>({
    description: "",
    image: "",
    link: "",
    positions: [],
    is_active: true,
  });
  const [buttonText, setButtonText] = useState<string>("Criar");

  const open = Boolean(anchorEl);

  const router = useRouter();

  const positionMap: Record<string, string> = {
    superTop: "Super Topo",
    top: "Topo",
    homeOne: "Home 1",
    homeTwo: "Home 2",
    homeThree: "Home 3",
    homeFour: "Home 4",
    homeFive: "Home 5",
    sideHome: "Home Lateral",
    side: "Lateral",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    bannerId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBannerId(bannerId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedBannerId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/banners/create", {
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
          image: "",
          link: "",
          positions: [],
          description: "",
          is_active: true,
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar Banner!"
      );
    }
  };

  const handleGetBannerInfos = async () => {
    if (!selectedBannerId) return;

    try {
      const response = await fetch(`/api/banners/${selectedBannerId}`, {
        method: "GET",
      });

      setButtonText("Editar");

      const data = await response.json();

      if (response.ok) {
        setAnchorEl(null);
        setFormData({
          description: data.description,
          image: data.image,
          is_active: data.is_active,
          link: data.link,
          positions: data.positions,
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      error instanceof Error ? error.message : "Erro ao obter Banner!";
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    if (!selectedBannerId) return;

    event.preventDefault();

    try {
      const response = await fetch(`/api/banners/${selectedBannerId}`, {
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
              description: "",
              image: "",
              is_active: true,
              link: "",
              positions: [],
            });
            router.refresh();
            setSelectedBannerId(null);
            setButtonText("Criar");
          },
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      error instanceof Error ? error.message : "Erro ao atualizar Banner!";
    }
  };

  const handleDelete = async () => {
    if (!selectedBannerId) return;

    try {
      const response = await fetch(`/api/banners/${selectedBannerId}`, {
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
    <>
      <section className="flex flex-col w-full justify-between gap-16 p-4 sm:p-12 mx-4 items-center bg-[var(--black-2)] my-20 lg:mx-16">
        <form
          onSubmit={selectedBannerId ? handleUpdate : handleSubmit}
          className="flex w-full h-[820px] lg:w-10/12 lg:h-[750px] xl:w-7/12 2xl:w-5/12  justify-center flex-col items-center border border-[var(--input-border)]"
        >
          <div className="flex flex-col gap-6 w-11/12 bg-[var(--black-2)] items-center">
            <h1 className="text-[var(--primary)] font-bold! text-xl!">
              Novo Banner
            </h1>
            <div className="flex flex-col gap-4 items-center w-full">
              <InputComponent
                label="Descrição do Banner"
                name="description"
                value={formData.description}
                required
                onChange={handleChange}
                className="w-10/12! lg:w-9/12! mb-0! bg-[var(--black-2)]!"
                sx={{
                  "& .MuiInputLabel-shrink": {
                    backgroundColor: "var(--black-2)",
                    padding: "0 6px",
                  },
                }}
              />
              <InputComponent
                label="Link da imagem"
                name="image"
                value={formData.image}
                required
                onChange={handleChange}
                className="w-10/12! lg:w-9/12! mb-0! bg-[var(--black-2)]!"
                sx={{
                  "& .MuiInputLabel-shrink": {
                    backgroundColor: "var(--black-2)",
                    padding: "0 6px",
                  },
                }}
              />
              <InputComponent
                label="URL do Banner"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-10/12! lg:w-9/12! mb-0! bg-[var(--black-2)]!"
                sx={{
                  "& .MuiInputLabel-shrink": {
                    backgroundColor: "var(--black-2)",
                    padding: "0 6px",
                  },
                }}
              />
              <div className="w-10/12 lg:w-9/12 mt-2 flex flex-col items-start">
                <label className="text-[var(--gray)] text-base mb-2 text-left">
                  Localização
                </label>
                <Checkbox
                  value={formData.positions}
                  options={[
                    { id: "superTop", name: "Super Topo" },
                    { id: "top", name: "Topo" },
                    { id: "homeOne", name: "Home 1" },
                    { id: "homeTwo", name: "Home 2" },
                    { id: "homeThree", name: "Home 3" },
                    { id: "homeFour", name: "Home 4" },
                    { id: "homeFive", name: "Home 5" },
                    { id: "sideHome", name: "Home Lateral" },
                    { id: "side", name: "Lateral" },
                  ]}
                  onChange={(selected) => {
                    let newPositions = selected;

                    if (selected.includes("side")) {
                      newPositions = ["side"];
                    } else {
                      newPositions = selected.filter((pos) => pos !== "side");
                    }

                    if (selected.includes("sideHome")) {
                      newPositions = ["sideHome"];
                    } else {
                      newPositions = selected.filter(
                        (pos) => pos !== "sideHome"
                      );
                    }

                    setFormData((prev) => ({
                      ...prev,
                      positions: newPositions as (
                        | "superTop"
                        | "top"
                        | "homeOne"
                        | "homeTwo"
                        | "homeThree"
                        | "homeFour"
                        | "homeFive"
                        | "sideHome"
                        | "side"
                      )[],
                    }));
                  }}
                />
              </div>
              <div className="w-10/12 lg:w-9/12 flex flex-col items-start mt-2">
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={handleChange}
                      name="is_active"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "var(--primary)",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "var(--primary)",
                          },
                        "& .MuiSwitch-switchBase.Mui-disabled": {
                          color: "var(--primary)",
                        },
                        "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track":
                          {
                            backgroundColor: "var(--primary)",
                            opacity: 1,
                          },
                      }}
                    />
                  }
                  label="Banner ativo?"
                  className="text-[var(--gray)]"
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                />
              </div>
              <ButtonComponent
                type="submit"
                label={buttonText}
                className="w-10/12! lg:w-9/12! mt-3!"
              />
            </div>
          </div>
        </form>
        {banners && banners.length > 0 ? (
          <>
            <div className="w-full border border-[var(--input-border)]">
              <div className="grid grid-cols-1 sm:grid-cols-4  p-2 bg-[var(--black-2)] text-[var(--primary)] font-bold border-b border-[var(--input-border)]">
                <h1 className="w-fit text-base text-center sm:text-left">
                  Título
                </h1>
                <h1 className="w-fit ml-16 text-base hidden xl:block text-left">
                  Status
                </h1>
                <h1 className="w-fit ml-1 text-base hidden xl:block text-left">
                  Posição
                </h1>
                <h1 className="w-fit ml-1 text-base hidden xl:block text-left">
                  Atualizado em
                </h1>
              </div>

              <ul className="bg-[var(--black-2)]">
                {banners.map((banner) => (
                  <li
                    key={banner.id}
                    className="grid h-28 p-4 grid-cols-2 xl:grid-cols-4 xl:h-36! 2xl:h-28! gap-4 border-t border-[var(--input-border)] items-center first:border-t-0"
                  >
                    <h2 className="text-left text-xs w-full text-[var(--gray)] lg:text-base font-semibold h-fit">
                      {banner.description.length > maxChars
                        ? banner.description.slice(0, maxChars) + "..."
                        : banner.description}
                    </h2>

                    <h2
                      className={`hidden ml-16 ${
                        banner.is_active
                          ? `text-[var(--gray)]`
                          : `text-[var(--primary)]`
                      } xl:text-base font-semibold  xl:block w-full whitespace-nowrap`}
                    >
                      {banner.is_active ? "Ativo" : "Desativado"}
                    </h2>

                    <h2 className="hidden xl:block w-fit text-xs text-[var(--gray)] lg:text-base font-semibold">
                      {banner.positions
                        .map((position) => positionMap[position])
                        .join(", ")}
                    </h2>

                    <div className="flex w-full h-fit justify-center items-center gap-4 xl:gap-8 2xl:gap-20">
                      <h2 className="hidden text-[var(--gray)] xl:text-base font-semibold  xl:block w-full whitespace-nowrap">
                        {banner.updated_at}
                      </h2>

                      <div className="flex w-full justify-end xl:justify-normal">
                        <IconButton
                          onClick={(event) => handleMenuClick(event, banner.id)}
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
                onClick={handleGetBannerInfos}
              >
                Editar Banner
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
                Excluir Banner
              </MenuItem>
            </Menu>
          </>
        ) : (
          <h2 className="text-[var(--primary)] font-bold text-2xl">
            Não há Banners cadastrados
          </h2>
        )}
      </section>
    </>
  );
};

export default BannersListComponent;
