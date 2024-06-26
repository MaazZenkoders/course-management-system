const { connectToDb } = require("../utils/db");

const createEnrollment = async (student_id, course_id) => {
  const pool = connectToDb();
  const data = { student_id, course_id };
  console.log(data)
  if (!student_id || !course_id) {
    throw new Error("Student ID and Course ID are required");
  }

  try {
    const [result] = await (await pool).query(
      "INSERT INTO enrollments (student_id, course_id) VALUES (? , ?)",
      [student_id, course_id]
    );
    console.log(result)

    return data;
   
  } catch (error) {
    console.log({error})
    throw new Error("Error creating enrollment: " + error);
  }
};

const getEnrollments = async (course_id) => {
  const pool = connectToDb();

  if (!course_id) {
    throw new Error("Course ID is required");
  }

  try {
    const [enrollments] = await pool.query(
      "SELECT students.name as studentName, courses.name as courseName, enrollments.* " +
        "FROM enrollments " +
        "INNER JOIN students ON enrollments.student_id = students.id " +
        "INNER JOIN courses ON enrollments.course_id = courses.id " +
        "WHERE courses.id = ?",
      [course_id]
    );

    return enrollments;
  } catch (error) {
    throw new Error("Error retrieving enrollments: " + error.message);
  }
};

const deleteEnrollment = async (student_id, course_id) => {
  const pool = connectToDb();

  if (!student_id || !course_id) {
    throw new Error("Student ID and Course ID are required");
  }

  try {
    const [result] = await pool.query(
      "DELETE enrollments " +
        "FROM enrollments " +
        "INNER JOIN courses ON enrollments.course_id = courses.id " +
        "WHERE enrollments.student_id = ? AND enrollments.course_id = ?",
      [student_id, course_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("No enrollment found to delete");
    }

    return { message: "Enrollment deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting enrollment: " + error.message);
  }
};

module.exports = {
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
};
