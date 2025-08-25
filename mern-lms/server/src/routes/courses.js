import { Router } from "express";
import { createCourse, listCourses, getCourse, enroll, myCourses } from "../controllers/courseController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", listCourses);
router.get("/mine", requireAuth, myCourses);
router.get("/:id", getCourse);
router.post("/", requireAuth, requireRole("instructor", "admin"), createCourse);
router.post("/:id/enroll", requireAuth, requireRole("student"), enroll);

export default router;
