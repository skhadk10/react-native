import Task from "../models/task.js";

export const create = async (req, res) => {
  try {
    const { content } = req.body;
    const task = await new Task({
      task: content,
      postedBy: req.user._id,
    }).save();
    const data = await Task.findById(task._id).populate("postedBy", "name");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const task = async (req, res) => {
  try {
    const task = await Task.find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });
    console.log(task, "task checking");
    res.json(task);
  } catch (error) {
    console.log(error);
  }
};
