import { useState, useEffect } from "react";
import { ICategoryReturn } from "@/@types/category";
import useAuthToken from "@/hooks/useAuthToken";

const useGetCategories = () => {
  const { token, loading: authLoading } = useAuthToken();
  const [categories, setCategories] = useState<ICategoryReturn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetCategories = async () => {
    if (!token) return;

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && token) {
      handleGetCategories();
    }
  }, [authLoading, token]);

  return { categories, loading, error, refetch: handleGetCategories };
};

export default useGetCategories;
