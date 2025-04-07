import { ICategoryReturn } from "@/@types/category";
import { IWeather } from "@/@types/weather";
import HeaderComponent from "@/components/HomePage/HeaderComponent";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";

interface CategoriesListClientProps {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
}

const CategoriesListClient = ({
  categories,
  weatherInfos,
}: CategoriesListClientProps) => {
  return (
    <DashboardLayoutProvider>
      <HeaderComponent weatherInfos={weatherInfos} categories={categories} />
    </DashboardLayoutProvider>
  );
};

export default CategoriesListClient;
