import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import type { TActivity } from "../types/activity";
import instance from "../utils/axios";
import useAuth from "../components/hooks/useAuth";
import CreateActivity from "../components/addTask";

const Home = () => {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const { data } = await instance.get(`/user/activity/${user._id}`);
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  return (
    <main className="min-h-screen bg-black-100 dark:bg-black-900">
      <Navbar setActivities={setActivities} />
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <header className="bg-blue-200 dark:bg-blue-700 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              My Todo Activities
            </h1>
          </header>
          <div className="p-4">
            <Table
              activities={activities}
              loading={loading}
              setActivities={setActivities}
            />
          </div>
        </div>
      </section>
      
    </main>
  );
};

export default Home;
