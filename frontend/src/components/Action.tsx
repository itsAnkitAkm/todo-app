import type { TActivity } from "../types/activity";
import instance from "../utils/axios";
import { notifySuccess, notifyWarn } from "../utils/toast";

const ActionButtons = ({
  activity,
  setActivities,
}: {
  activity: TActivity;
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const isPending = activity.status === "pending";

  const handleStatusChange = async (
    status: "ongoing" | "paused" | "completed"
  ) => {
    try {
      const { data } = await instance.patch(`/activity/${activity._id}`, {
        status,
      });
      setActivities((prev) =>
        prev.map((act) => (act._id === activity._id ? data.activity : act))
      );
      notifySuccess("Task status updated ");
    } catch (error: any) {
      console.log(error);
      notifyWarn(error.response.data.message);
    }
  };

  return (
    <div className="flex space-x-2">
      {activity.status === "pending" && (
        <button
          onClick={() => handleStatusChange("ongoing")}
          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Start
        </button>
      )}
      {activity.status === "ongoing" && (
        <button
          onClick={() => handleStatusChange("paused")}
          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Pause
        </button>
      )}
      {activity.status === "paused" && (
        <button
          onClick={() => handleStatusChange("ongoing")}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Resume
        </button>
      )}
      {activity.status !== "completed" && (
        <button
          onClick={() => handleStatusChange("completed")}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          End
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
