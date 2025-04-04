import CategoriesListClient from "./CategoriesListClient";
import { ICategoryReturn } from "@/@types/category";

const fetchCategories = async (): Promise<ICategoryReturn[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar categorias");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};

const NewsListPage = async () => {
  const categories = await fetchCategories();
  return <CategoriesListClient categories={categories} />;
};

export default NewsListPage;
