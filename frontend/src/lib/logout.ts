const logout = async () => {
  await fetch("/api/logout", { method: "POST" });
};

export default logout;
