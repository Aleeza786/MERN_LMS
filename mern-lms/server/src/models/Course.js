import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  videoUrl: { type: String, default: "" }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lessons: [lessonSchema],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
