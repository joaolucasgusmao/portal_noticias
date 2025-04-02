import useGetCategories from "@/hooks/useGetCategories";
import { useEffect, useState } from "react";
import InputComponent from "../../commons/InputComponent";
import { Box, Chip, FormControlLabel, Switch, Typography } from "@mui/material";
import ButtonComponent from "../../commons/ButtonComponent";
import Checkbox from "../../commons/CheckboxComponent";
import { toast } from "react-toastify";
import { INewsCreate } from "@/@types/news";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

const CreateNewsComponentForm: React.FC = () => {
  const [formData, setFormData] = useState<INewsCreate>({
    hat: "",
    title: "",
    summary: "",
    image: "",
    content: "",
    caption: "",
    topics: [],
    categories: [],
    is_draft: false,
    is_fixed: false,
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [showNoCategoriesMessage, setShowNoCategoriesMessage] =
    useState<boolean>(false);

  const router = useRouter();

  const { categories, loading, error } = useGetCategories();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoCategoriesMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        setFormData((prev) => ({
          ...prev,
          topics: [...(prev.topics || []), inputValue.trim()],
        }));
        setInputValue("");
      }
    }
  };

  const handleDeleteTopic = (topicToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics?.filter((topic) => topic !== topicToDelete),
    }));
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/news/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar a notícia");
      }

      if (formData.is_draft) {
        toast.success("Rascunho salvo com sucesso!", {
          onClose: () => {
            router.push("/dashboard/news");
          },
        });
      } else {
        toast.success(data.message, {
          onClose: () => {
            router.push("/dashboard/news");
          },
        });
      }

      setFormData({
        hat: "",
        title: "",
        summary: "",
        image: "",
        content: "",
        caption: "",
        topics: [],
        categories: [],
        is_draft: false,
        is_fixed: false,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar notícia!"
      );
    }
  };

  return (
    <>
      <section className="flex flex-col gap-2 p-2 bg-[var(--black)] mx-3 mb-10 mt-24">
        <Typography
          className="text-[var(--primary)] font-bold! text-xl!"
          sx={{
            "@media (min-width: 600px)": {
              ml: 7,
            },
          }}
        >
          Criar nova Notícia
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 1200,
            mx: 7,
            mt: 4,
            "@media (max-width: 600px)": {
              mx: 0,
            },
          }}
          className="flex flex-col gap-4 items-center"
        >
          <Box className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Box>
              <InputComponent
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <InputComponent
                label="Chapéu"
                name="hat"
                value={formData.hat}
                onChange={handleChange}
              />
              <InputComponent
                label="Resumo"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                multiline
                rows={3}
              />
              <InputComponent
                label="Link da Imagem *"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              <InputComponent
                label="Legenda"
                name="caption"
                value={formData.caption}
                onChange={handleChange}
              />

              <Box>
                <InputComponent
                  label="Tópicos (Separe por vírgula ou aperte enter)"
                  name="topics"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <Box className="mt-2 flex flex-wrap gap-2 mb-4">
                  {formData.topics?.map((topic, index) => (
                    <Chip
                      key={index}
                      label={topic}
                      onDelete={() => handleDeleteTopic(topic)}
                      variant="outlined"
                      className="text-[var(--gray)]! text-sm! bg-[var(--black)]! border-2! border-[var(--input-border)]!"
                      sx={{
                        "& .MuiChip-deleteIcon": {
                          color: "var(--primary)",
                          "&:hover": {
                            color: "var(--primary-hover)",
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
                <Box className="flex flex-col sm:flex-row gap-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.is_fixed}
                        onChange={handleChange}
                        name="is_fixed"
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
                    label="Fixar notícia"
                    className="text-[var(--gray)]"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.is_draft}
                        onChange={handleChange}
                        name="is_draft"
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
                    label="Rascunho"
                    className="text-[var(--gray)]"
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <InputComponent
                label="Escreva seu Conteúdo aqui"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={12.4}
                required
              />
              {loading ? (
                <div className="mt-4 mb-5! sm:mt-10 sm:mb-0 flex justify-center items-center">
                  <ClipLoader color="var(--primary)" size={40} />
                </div>
              ) : categories.length > 0 ? (
                <Checkbox
                  label="Categorias"
                  value={formData.categories}
                  options={categories}
                  onChange={(selected) =>
                    setFormData((prev) => ({ ...prev, categories: selected }))
                  }
                />
              ) : showNoCategoriesMessage ? (
                <div className="mt-4 mb-5! sm:mt-10 sm:mb-0 flex justify-center items-center">
                  <p className="text-xl font-bold text-[var(--primary)]">
                    Nenhuma Categoria cadastrada!
                  </p>
                </div>
              ) : null}
            </Box>
          </Box>

          <ButtonComponent
            type="submit"
            label={formData.is_draft ? "Salvar Rascunho" : "Publicar"}
            className="w-full! xl:w-2/6!"
          />
        </Box>
      </section>
    </>
  );
};

export default CreateNewsComponentForm;
