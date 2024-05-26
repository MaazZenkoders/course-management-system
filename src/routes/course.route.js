const express = require("express");
const courseRouter = express.Router();
const courseController = require("../controllers/course.controller");
const { authorizeTeacher } = require("../middlewares/auth");

courseRouter.post("/create", authorizeTeacher, courseController.createCourse);
courseRouter.get("/getAll", authorizeTeacher, courseController.getAllCourses);
courseRouter.put("/update/:id", authorizeTeacher, courseController.updateById);
courseRouter.delete(
  "/delete/:id",
  authorizeTeacher,
  courseController.deleteById
);

module.exports = courseRouter;
