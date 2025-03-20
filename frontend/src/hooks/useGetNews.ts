import { useState, useEffect } from "react";

import useAuthToken from "@/hooks/useAuthToken";
import { INews } from "@/@types/news";

const useGetNews = () => {
  const { token, loading } = useAuthToken();
  const [news, setNews] = useState<INews[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetNews = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar noticias");
      }

      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError((err as Error).message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!loading) {
      handleGetNews();
    }
  }, [loading, token]);

  return { news, error, refetch: handleGetNews };
};

export default useGetNews;
