import { useState, useEffect } from "react";
import instance from "../../utils/axios";
import type { TUser } from "../../types/user";

const useAuth = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // For component unmount safety

    const getUser = async () => {
      try {
        setUserLoading(true);
        setError(null); // Reset error state before fetch
        const { data } = await instance.get<{ user: TUser }>("user/me"); // Strongly type Axios response
        if (isMounted) {
          setUser(data.user);
        }
      } catch (err: any) {
        if (isMounted) {
          setUser(null);
          setError(err.response?.data?.message || "Failed to fetch user.");
        }
      } finally {
        if (isMounted) {
          setUserLoading(false);
        }
      }
    };

    getUser();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return { user, userLoading, error, setUser };
};

export default useAuth;
