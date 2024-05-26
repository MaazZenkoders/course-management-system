const { connectToDb } = require("../utils/db");
const bcrypt = require("bcrypt");

const getStudents = async () => {
  const pool = await connectToDb();
  try {
    const [students] = await pool.query(`SELECT * FROM students`);
    return students;
  } catch (error) {
    throw new Error("Error while retrieving data");
  }
};

const updateStudent = async (student_id, name, email, password) => {
  const pool = await connectToDb();
  try {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `UPDATE students SET name = ?, email = ?, password = ? WHERE student_id = ?`,
      [name, email, hashedPassword, student_id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No student found with id ${student_id}`);
    }

    const data = { name, email, password };
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error updating student: ${error.message}`);
  }
};

const deleteStudent = async (student_id) => {
  const pool = await connectToDb();
  try {
    const [result] = await pool.query(
      `DELETE FROM teachers WHERE student_id = ?`,
      [student_id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`No teacher found with id ${student_id}`);
    }
    return student_id;
  } catch (error) {
    throw new Error(`Error deleting teacher: ${error.message}`);
  }
};

module.exports = { getStudents, updateStudent, deleteStudent };
