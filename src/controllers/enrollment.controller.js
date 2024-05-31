const enrollmentService = require("../services/enrollment.service");

const createEnrollment = async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    const enrollment = await enrollmentService.createEnrollment(
      student_id,
      course_id
    );
    res.status(201).json({
      enrollment: enrollment,
      message: "Enrollment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating enrollment",
    });
  }
};

const getEnrollments = async (req, res) => {
  const { courseId } = req.params;
  try {
    const enrollments = await enrollmentService.getEnrollments(courseId);
    res.status(200).json({
      enrollments: enrollments,
      message: "Enrollments retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving enrollments",
    });
  }
};

const deleteEnrollment = async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const result = await enrollmentService.deleteEnrollment(
      studentId,
      courseId
    );
    res.status(200).json({
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting enrollment",
    });
  }
};

module.exports = {
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
};
