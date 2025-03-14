import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

const userLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);

        if (data.user) {
          const { name, email, avatar, is_admin } = data.user;
          setUser({ name, email, avatar, is_admin });
        }

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error(data.error);
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

export default userLogin;
