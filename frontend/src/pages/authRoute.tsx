import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useEffect, ReactNode } from "react";
import useAuth from "../components/hooks/useAuth"; 

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { user, userLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  if (userLoading) {
    return (
      <div className="fixed dark:bg-gray-900 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>; // Ensure children are rendered properly
};

export default AuthRoute;
