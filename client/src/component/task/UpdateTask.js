import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { TaskContext } from "../../context/task";
import { AuthContext } from "../../context/auth";

const UpdateTask = () => {
  const [task, setTask] = useContext(TaskContext);
  const [content, setContent] = useState("");

  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (task) {
      setContent(task?.selected?.task);
    }
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/update", { content });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const canUpdateDelete = auth?.user?._id === task?.selected?.postedBy._id;
  return (
    <>
      <Modal
        centered
        open={task?.selected !== null}
        // onOk={() => setTask({ ...task, selected: null })}
        onCancel={() => setTask({ ...task, selected: null })}
        footer={null}
      >
        <form className="d-flex justify-content p-3">
          <textarea
            maxLength="160"
            className="form-control m-1"
            placeholder="write something"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {canUpdateDelete ? (
            <>
              <button onClick={handleUpdate} className="btn btn-primary m-1">
                Update
              </button>
              <button onClick={handleDelete} className="btn btn-danger m-1">
                Delete
              </button>
            </>
          ) : (
            <p>By {task?.selected?.postedBy?.name}</p>
          )}
        </form>
      </Modal>
    </>
  );
};

export default UpdateTask;
