import type { TActivity } from "../types/activity";
import { formatTime } from "../utils/helpers";
import ActionButtons from "./Action";
import ActiveDuration from "./timer";
import Loader from "./Loader";
import instance from "../utils/axios";
import { notifySuccess } from "../utils/toast";
import ActivityLogs from "./logs";

const Table = ({
  activities,
  loading,
  setActivities,
}: {
  activities: TActivity[];
  loading: boolean;
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const deleteActivity = async (id: string) => {
    try {
      await instance.delete(`activity/${id}`);
      setActivities((prev) => prev.filter((activity) => activity._id !== id));
      notifySuccess("Activity deleted successfully");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden sm:rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Serial Number</th>
                <th className="px-6 py-3">Activity Name</th>
                <th className="px-6 py-3">Active Duration</th>
                {/* <th className="px-6 py-3">Total Active Duration</th> */}
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 dark:text-white text-sm">
              {activities.map((activity, index) => (
                <tr
                  key={activity._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{activity.name}</td>
                  <td className="px-6 py-4">
  {activity.status === "ongoing" ? (
    <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md">
      <ActiveDuration duration={new Date(activity.lastResumedAt)} />
    </span>
  ) : (
    <span className="inline-block px-4 py-2 bg-gray-300 text-black rounded-md">
      00:00:00
    </span>
  )}
</td>

                  {/* <td className="px-6 py-4">{formatTime(new Date(activity.totalActiveDuration))}</td> */}
                  <td className="px-6 py-4">{activity.status}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center">
                      {activity.status !== "completed" ? (
                        <ActionButtons
                          setActivities={setActivities}
                          activity={activity}
                        />
                      ) : (
                        <ActivityLogs activity={activity} />
                      )}
                      <button
                        onClick={() => deleteActivity(activity._id)}
                        className="ml-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 6L9 16 5 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
