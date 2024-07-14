import { TActivity } from "../types/activity";

const ActivityLogs = ({ activity }: { activity: TActivity }) => {
  const showModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  const hideModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        onClick={showModal}
      >
        View Activity Logs
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-white mb-4">
            Activity Logs for Task: {activity.name}
          </h3>
          <div className="space-y-2">
            {activity.logs.map((log, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-4 py-2 rounded-md ${
                  log.action === "created"
                    ? "bg-blue-100"
                    : log.action === "completed"
                    ? "bg-green-100"
                    : log.action === "paused"
                    ? "bg-yellow-100"
                    : "bg-gray-100"
                }`}
              >
                <p className={`text-gray-800`}>
                  {log.action === "in progress" ? "In Progress" : log.action}
                </p>
                <p className="text-gray-600">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400"
                onClick={hideModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ActivityLogs;
