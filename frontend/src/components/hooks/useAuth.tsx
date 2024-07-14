import { useState, useEffect } from "react";
import instance from "../../utils/axios";
import type { TUser } from "../../types/user";

const useAuth = () => {
  const [user, setUser] = useState<null | TUser>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        setUserLoading(true);
        const { data } = await instance.get("user/me");
        setUser(data.user);
        setUserLoading(false);
      } catch (error) {
        console.log(error);
        setUserLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, userLoading, setUser };
};

export default useAuth;
