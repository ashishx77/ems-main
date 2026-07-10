import { useContext } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { AuthContext } from "../../context/AuthProvider";

const TaskList = ({ data }) => {
  const { updateTaskStatus } = useContext(AuthContext);

  if (!data?.tasks?.length) {
    return (
      <div className="mt-10 flex h-48 items-center justify-center rounded-xl border border-slate-700 bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-400">
          No tasks assigned yet
        </h2>
      </div>
    );
  }

  return (
    <div
      id="tasklist"
      className="mt-10 flex w-full snap-x gap-5 overflow-x-auto pb-4"
    >
      {data.tasks.map((task) => {
        if (task.status === "active") {
          return (
            <AcceptTask
              key={task._id}
              data={task}
              onComplete={() => updateTaskStatus(task._id, "completed")}
              onFail={() => updateTaskStatus(task._id, "failed")}
            />
          );
        }

        if (task.status === "new") {
          return (
            <NewTask
              key={task._id}
              data={task}
              onAccept={() => updateTaskStatus(task._id, "active")}
            />
          );
        }

        if (task.status === "completed") {
          return <CompleteTask key={task._id} data={task} />;
        }

        if (task.status === "failed") {
          return <FailedTask key={task._id} data={task} />;
        }

        return null;
      })}
    </div>
  );
};

export default TaskList;
