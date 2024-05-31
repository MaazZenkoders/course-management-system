const courseService = require("../services/course.service");

const createCourse = async (req, res) => {
  const { name, description } = req.body;
  try {
    const course = await courseService.createCourse(name, description);
    res.status(201).json({
      course: course,
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating course",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getCourses();
    res.status(200).json({
      courses: courses,
      message: "Data retrieved",
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldnot retrieve data",
    });
  }
};

const updateById = async (req, res) => {
  const student_id = req.params.id;
  const { name, description } = req.body;
  try {
    const updatedCourse = await courseService.updateCourse(
      student_id,
      name,
      description
    );
    res.status(201).json({
      updatedCourse: updatedCourse,
      message: "Course updated succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldnt update data",
    });
  }
};

const deleteById = async (req, res) => {
  const student_id = req.params.id;
  const name = req.body
  try {
    const deletedCourse = await courseService.deleteCourse(student_id);
    res.status(202).json({
      message: "Course deleted successfully",
      data : {name,student_id}
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting course",
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  updateById,
  deleteById,
};
