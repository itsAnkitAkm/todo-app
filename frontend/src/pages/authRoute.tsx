import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useEffect } from "react";
import useAuth from "../components/hooks/useAuth";
// useEffect
const authRoute = ({ children }: { children: any }) => {
  const { user, userLoading } = useAuth();
  const navigate = useNavigate();

  console.log(user, userLoading);

  useEffect(() => {
    if (user == null && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading]);

  if (userLoading) {
    return (
      <div className="fixed dark:bg-gray-900 top-0 left-0 right-0 bottom-0  flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return children;
};

export default authRoute;
