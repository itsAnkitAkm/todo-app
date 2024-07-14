import useAuth from "./hooks/useAuth";
import CreateActivity from "./addTask";
import { TActivity } from "../types/activity";
import instance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { BsPerson } from 'react-icons/bs'; // Import user icon from react-icons

const Navbar = ({
  setActivities,
}: {
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const logout = async () => {
    await instance.get("user/auth/logout");
    setUser(null);
    navigate("login");
  };

  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">MY TODO</h1> {/* App title centered */}
        <div className="flex items-center">
          <CreateActivity setActivities={setActivities} /> {/* Create activity component */}
          <div className="ml-4 flex items-center">
            <BsPerson className="text-xl" /> {/* User icon */}
            <span className="ml-2 hidden md:inline">{user?.name || ""}</span> {/* Show name on hover */}
          </div>
          <div className="ml-4">
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
