import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/token", { credentials: "include" });

        if (res.ok) {
          const data = await res.json();
          setToken(data.token);
        } else {
          setToken(null);
        }
      } catch (error) {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading };
};

export default useAuthToken;
