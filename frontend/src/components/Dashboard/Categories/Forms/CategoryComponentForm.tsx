import { useState } from "react";
import InputComponent from "../../commons/InputComponent";
import { Box, Typography } from "@mui/material";
import ButtonComponent from "../../commons/ButtonComponent";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ICreateCategory } from "@/@types/category";

const CategoryComponentForm: React.FC = () => {
  const [formData, setFormData] = useState<ICreateCategory>({
    name: "",
  });

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
      const res = await fetch("/api/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar a categoria");
      }

      toast.success(data.message, {
        onClose: () => {
          router.push("/dashboard");
        },
      });

      setFormData({
        name: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar notícia!"
      );
    }
  };

  return (
    <>
      <section className="flex flex-col p-2 bg-[var(--black)] mx-3 mb-10 mt-24">
        <Typography
          className="text-[var(--primary)] font-bold! text-xl!"
          sx={{
            "@media (min-width: 600px)": {
              ml: 7,
            },
          }}
        >
          Categorias
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
          <Box className="flex flex-col">
            <Box>
              <InputComponent
                label="Nome da categoria"
                name="name"
                value={formData.name}
                required
              />
            </Box>

            <ButtonComponent
              type="submit"
              label="Criar categoria"
              className="w-full"
            />
          </Box>
        </Box>
        <Box></Box>
      </section>
    </>
  );
};

export default CategoryComponentForm;
