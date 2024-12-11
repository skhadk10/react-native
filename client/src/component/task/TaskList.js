import React, { useContext } from "react";
import { TaskContext } from "../../context/task";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../../context/auth";
dayjs.extend(relativeTime);
const TaskList = () => {
  const [task, setTask] = useContext(TaskContext);
  const [auth, setAuth] = useContext(AuthContext);

  const handleClick = (item) => {
    setTask({ ...task, selected: item });
  };



  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {task?.tasks?.map((task) => (
            <div
              key={task._id}

              style={
                {
                  backgroundColor:auth?.user?._id === task?.postedBy?._id? '#f2ffe6':'#ffe6e6'
                }
              }
              className="rounded shadow p-2 m-2 tasklist"
              onClick={() => handleClick(task)}
            >
              <p>{task.task}</p>

              <p
                className="float-end"
                style={{ fontSize: "8px", marginTop: "-15px" }}
              >
                {dayjs(task.createdAt).fromNow()} By{" "}
                <b>{task?.postedBy?.name}</b>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
