const studentService = require("../services/student.service");

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getStudents();
    res.status(200).json({
      students: students,
      message: "Data retrieved",
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldnot retrieve data",
    });
  }
};

const updateStudentById = async (req, res) => {
  const student_id = req.params.id;
  const { name, email, password } = req.body;

  try {
    const updatedStudent = await studentService.updateStudent(
      student_id,
      name,
      email,
      password
    );
    res.status(201).json({
      updatedStudent: updatedStudent,
      message: "Student updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while updating",
    });
  }
};

const deleteStudentById = async (req, res) => {
  const student_id = req.params.teacher_id;
  try {
    const deletedStudent = await studentService.deleteStudent(student_id);
    res.status(202).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Deletion unsuccessful",
    });
  }
};

module.exports = { getAllStudents, updateStudentById, deleteStudentById };
