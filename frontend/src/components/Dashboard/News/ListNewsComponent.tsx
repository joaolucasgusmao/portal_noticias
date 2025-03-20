import { ICategory } from "@/@types/category";
import { IUser } from "@/@types/user";
import useGetNews from "@/hooks/useGetNews";

interface ListNewsComponentProps {
  id: number;
  title: string;
  categories: ICategory[];
  user: IUser;
  created_at: string;
}

const ListNewsComponent = ({
  id,
  title,
  categories,
  user,
  created_at,
}: ListNewsComponentProps) => {
  const { news } = useGetNews();
};

export default ListNewsComponent;
