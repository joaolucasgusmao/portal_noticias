import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token") || null;
};

export const setToken = (token: string) => {
  Cookies.set("token", token, {
    expires: 1, 
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

export const removeToken = () => {
  Cookies.remove("token", { path: "/" });
};
