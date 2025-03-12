export interface IUser {
  id?: number;
  name: string;
  email: string;
  is_admin?: boolean;
  birth_date?: string;
  phone_number?: string;
  gender?: "m" | "f" | "o";
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}
