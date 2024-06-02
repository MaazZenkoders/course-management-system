const express = require("express");
const courseRouter = express.Router();
const courseController = require("../controllers/course.controller");
const { verifyToken, authorizeTeacher } = require("../middlewares/auth");

courseRouter.post(
  "/create",
  verifyToken,
  authorizeTeacher,
  courseController.createCourse
);
courseRouter.get("/getAll", courseController.getAllCourses);
courseRouter.put("/update/:id", courseController.updateById);
courseRouter.delete("/delete/:id", courseController.deleteById);

module.exports = courseRouter;
