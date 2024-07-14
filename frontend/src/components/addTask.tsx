import { useState } from "react";
import instance from "../utils/axios";
import { notifyError, notifySuccess } from "../utils/toast";
import { TActivity } from "../types/activity";

const CreateActivity = ({
  setActivities,
}: {
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const openModal = () => {
    const modalElement = document.getElementById("activity_modal");
    if (modalElement instanceof HTMLDialogElement) {
      modalElement.showModal();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById("activity_modal");
    if (modalElement instanceof HTMLDialogElement) {
      modalElement.close();
    }
  };

  const [activityName, setActivityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await instance.post("activity", { name: activityName });
      notifySuccess("Activity created successfully");
      setActivityName("");
      setActivities((prev) => [...prev, data.activity]);
      setIsLoading(false);
      closeModal();
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      notifyError(error.response.data.message);
    }
  };

  return (
    <>
      <button className="btn bg-teal-500 text-white rounded-full px-4 py-2" onClick={openModal}>
        Add Task +
      </button>
      <dialog id="activity_modal" className="modal">
        <div className="modal-box" style={{ backgroundColor: "#251857" }}>
          <h3 className="font-bold text-xl text-center mb-4 text-white">Create New Task</h3>
          <div className="modal-action flex flex-col items-center">
            <form method="dialog" className="w-full">
              <label htmlFor="activityName" className="block text-sm font-medium text-gray-300">
                Task Name
              </label>
              <div className="flex mb-4 justify-center items-center">
                <input
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  type="text"
                  name="activityName"
                  id="activityName"
                  placeholder="Enter Task name"
                  className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
                <button
                  disabled={isLoading}
                  onClick={handleCreateActivity}
                  className="ml-2 bg-teal-500 text-white rounded-lg px-4 py-2"
                >
                  {isLoading ? "Creating..." : "Add"}
                </button>
              </div>
            </form>
            <button onClick={closeModal} className="btn bg-red-500 text-white rounded-full px-4 py-2 mt-2">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateActivity;
