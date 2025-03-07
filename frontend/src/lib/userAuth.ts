import { useEffect, useState } from "react";

const userAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch("/api/token", { credentials: "include" });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
      } else {
        setToken(null);
      }

      setLoading(false);
    };

    fetchToken();
  }, []);

  return { token, loading };
};

export default userAuth;
