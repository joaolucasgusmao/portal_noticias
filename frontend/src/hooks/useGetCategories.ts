import { useState, useEffect } from "react";
import userAuth from "@/lib/userAuth";
import { ICategory } from "@/@types/category";

const useGetCategories = () => {
  const { token, loading } = userAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetCategories = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError((err as Error).message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!loading) {
      handleGetCategories();
    }
  }, [loading, token]);

  return { categories, error, refetch: handleGetCategories };
};

export default useGetCategories;
