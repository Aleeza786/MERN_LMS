import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, lessons = [] } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const course = await Course.create({
      title,
      description,
      lessons,
      instructor: req.user._id
    });
    const populated = await course.populate("instructor", "name email");
    return res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const listCourses = async (_req, res) => {
  const courses = await Course.find()
    .sort({ createdAt: -1 })
    .populate("instructor", "name email");
  return res.json(courses);
};

export const getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id).populate("instructor", "name email");
  if (!course) return res.status(404).json({ message: "Course not found" });
  return res.json(course);
};

export const enroll = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (course.instructor.toString() == req.user._id.toString()) {
    return res.status(400).json({ message: "Instructor cannot enroll in own course" });
  }
  const already = course.students.some(s => s.toString() === req.user._id.toString());
  if (already) return res.status(400).json({ message: "Already enrolled" });
  course.students.push(req.user._id);
  await course.save();
  return res.json({ message: "Enrolled", courseId: id });
};

export const myCourses = async (req, res) => {
  const studentCourses = await Course.find({ students: req.user._id }).populate("instructor", "name email");
  const instructorCourses = await Course.find({ instructor: req.user._id }).populate("instructor", "name email");
  return res.json({ asStudent: studentCourses, asInstructor: instructorCourses });
};
