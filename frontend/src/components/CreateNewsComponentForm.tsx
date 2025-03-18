import useGetCategories from "@/hooks/useGetCategories";
import { useState } from "react";
import InputComponent from "./commons/InputComponent";
import { Box, FormControlLabel, Switch } from "@mui/material";
import ButtonComponent from "./commons/ButtonComponent";
import SelectComponent from "./commons/SelectComponent";
import HeaderComponent from "./HeaderComponent";

const CreateNewsComponentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    hat: "",
    title: "",
    summary: "",
    image: "",
    content: "",
    caption: "",
    topics: "",
    is_fixed: false,
    is_draft: false,
    is_active: true,
    user_id: "",
    categories: [] as number[],
  });

  const { categories } = useGetCategories();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name as string]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <HeaderComponent>

      </HeaderComponent>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "var(--black)" }}
        p={2}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
        >
          <InputComponent
            label="Chapéu"
            name="Chapéu"
            value={formData.hat}
            onChange={handleChange}
          />
          <InputComponent
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <InputComponent
            label="Resumo"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            multiline
            rows={6}
          />
          <InputComponent
            label="URL da Imagem"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <InputComponent
            label="Conteúdo"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={5}
            required
          />
          <InputComponent
            label="Legenda"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
          />
          <InputComponent
            label="Tópicos (separados por vírgula)"
            name="topics"
            value={formData.topics}
            onChange={handleChange}
          />

          <SelectComponent
            label="Categorias"
            value={formData.categories}
            options={categories}
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, categories: selected }))
            }
          />
          <Box className="flex flex-col items-start sm:flex-row gap-2">
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
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--primary)",
                    },
                    "& .MuiSwitch-switchBase.Mui-disabled": {
                      color: "var(--primary)",
                    },
                    "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
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
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--primary)",
                    },
                    "& .MuiSwitch-switchBase.Mui-disabled": {
                      color: "var(--primary)",
                    },
                    "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
                      backgroundColor: "var(--primary)",
                      opacity: 1,
                    },
                  }}
                />
              }
              label="Rascunho"
              className="text-[var(--gray)]"
            />
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
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--primary)",
                    },
                    "& .MuiSwitch-switchBase.Mui-disabled": {
                      color: "var(--primary!)",
                    },
                    "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
                      backgroundColor: "var(--primary!)",
                      opacity: 1,
                    },
                  }}
                />
              }
              label="Ativo"
              className="text-[var(--gray)]"
            />
          </Box>
          <ButtonComponent
            className="mt-2!"
            type="submit"
            label="Criar Noticia"
            fullWidth
          />
        </Box>
      </Box>
    </>
  );
};

export default CreateNewsComponentForm;
