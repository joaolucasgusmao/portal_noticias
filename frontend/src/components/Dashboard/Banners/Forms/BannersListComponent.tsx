import { IBannerCreate, IBannerReturn } from "@/@types/banner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface BannersListComponentProps {
  banners: IBannerReturn[];
}

const BannersListComponent = ({ banners }: BannersListComponentProps) => {
  const [formData, setFormData] = useState<IBannerCreate>({
    image: "",
    link: "",
    top: null,
    side: null,
    home: null,
    description: "",
  });

  const router = useRouter();

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
          top: null,
          side: null,
          home: null,
          description: "",
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
};

export default BannersListComponent;
