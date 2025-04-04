import { IBannerReturn } from "@/@types/banner";
import BannersListClient from "./BannersListClient";

const fetchBanners = async (): Promise<IBannerReturn[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar Banners");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar Banners:", error);
    return [];
  }
};

const BannersListPage = async () => {
  const banners = await fetchBanners();
  return <BannersListClient banners={banners} />;
};

export default BannersListPage;
