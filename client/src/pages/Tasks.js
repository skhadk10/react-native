import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TaskContext } from "../context/task";
import CreateTask from "../component/task/CreateTask";
import TaskList from "../component/task/TaskList";
import UpdateTask from "../component/task/UpdateTask";
const Tasks = () => {
  const [task, setTask] = useContext(TaskContext);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const { data } = await axios.get("/tasks");
      setTask({ ...task, tasks: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CreateTask />
      <TaskList />
      <UpdateTask/>
    </>
  );
};

export default Tasks;
