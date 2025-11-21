import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
});

export default mongoose.model("Task", TaskSchema);
