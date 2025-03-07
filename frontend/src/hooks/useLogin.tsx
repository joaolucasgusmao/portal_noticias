import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setToken } from "@/lib/auth";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Login realizado com sucesso!");
        setToken(data.access_token);

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        toast.error("E-mail ou senha incorretos!");
      }
    } catch (error) {
      toast.error("Erro ao tentar fazer o login. Por favor, tente novamente.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    handleLogin,
    handleClickShowPassword,
  };
};

export default useLogin;
