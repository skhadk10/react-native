import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TaskContext } from "../../context/task";
const CreateTask = () => {
  const [content, setContent] = useState("");
  const [task, setTask] = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/task", {
        content,
      });
      setTask({ ...task, tasks: [data, ...task.tasks] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex justify-content" onSubmit={handleSubmit}>
        <textarea
          maxLength="160"
          className="form-control m-1"
          placeholder="write something"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn btn-primary m-1">submit</button>;
      </form>
    </>
  );
};

export default CreateTask;
