const { connectToDb } = require("../utils/db");

const createCourse = async (name, description) => {
  const pool = await connectToDb();
  try {
    const [result] = await pool.execute(
      'INSERT INTO courses (name, description) VALUES (?, ?)',
      [name, description])
    const info = { name, description };
    return info;
  } catch (error) {
    throw new Error("Error creating course: " + error.message);
  }
};

const getCourses = async () => {
  const pool = await connectToDb();
  try {
    const [courses] = await pool.query("SELECT * FROM courses");
    return courses;
  } catch (error) {
    throw new Error("Error retrieving courses: " + error.message);
  }
};

const updateCourse = async (course_id, name, description) => {
  const pool = await connectToDb();
  try {
    const [result] = await pool.query(
      "UPDATE courses SET name = ?, description = ? WHERE course_id = ?",
      [name, description, course_id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`No course found with id ${course_id}`);
    }
    return { course_id, name, description };
  } catch (error) {
    throw new Error("Error updating course: " + error.message);
  }
};

const deleteCourse = async (course_id,name) => {
  const pool = await connectToDb();
  try {
    const [result] = await pool.query(
      "DELETE FROM courses WHERE course_id = ?",
      [course_id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`No course found with id ${course_id}`);
    }
    return { message: `Course ${name} with id ${course_id} deleted successfully` };
  } catch (error) {
    throw new Error("Error deleting course: " + error.message);
  }
};

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};
