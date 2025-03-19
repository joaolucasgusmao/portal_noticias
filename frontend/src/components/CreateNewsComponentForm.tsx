import useGetCategories from "@/hooks/useGetCategories";
import { useState } from "react";
import InputComponent from "./commons/InputComponent";
import { Box, Chip, FormControlLabel, Switch } from "@mui/material";
import ButtonComponent from "./commons/ButtonComponent";
import Checkbox from "./commons/CheckboxComponent";
import { toast } from "react-toastify";

const CreateNewsComponentForm: React.FC = () => {
  const [formData, setFormData] = useState<INews>({
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        setFormData((prev) => ({
          ...prev,
          topics: [...prev.topics, inputValue.trim()],
        }));
        setInputValue("");
      }
    }
  };

  const handleDeleteTopic = (topicToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic) => topic !== topicToDelete),
    }));
  };

  const { categories } = useGetCategories();

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

      toast.success("Notícia criada com sucesso!");

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
      <Box
        display="flex"
        flexDirection="column"
        gap="0.5rem"
        alignItems="center"
        sx={{ backgroundColor: "var(--black)" }}
        p={2}
      >
        <h1 className="text-[var(--primary)] font-bold text-2xl">
          Criar nova Notícia
        </h1>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 1200, mx: 7, mt: 4 }}
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
                label="URL da Imagem *"
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
                  {formData.topics.map((topic, index) => (
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
                <Checkbox
                  label="Categorias"
                  value={formData.categories}
                  options={categories}
                  onChange={(selected) =>
                    setFormData((prev) => ({ ...prev, categories: selected }))
                  }
                />
              </Box>
            </Box>
            <Box>
              <InputComponent
                label="Conteúdo"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={19}
                required
              />
            </Box>
          </Box>

          <ButtonComponent
            type="submit"
            label="Criar Notícia"
            className="w-full! xl:w-2/6!"
          />
        </Box>
      </Box>
    </>
  );
};

export default CreateNewsComponentForm;
