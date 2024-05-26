const { generateToken } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { connectToDb } = require("../utils/db");

const signup = async (name, email, password, isAdmin) => {
  const tableName = isAdmin ? "teachers" : "students";
  const pool = connectToDb();

  if (!name || !email || !password) {
    return null;
  }
  try {
    const [existingUser] = await pool.query(
      `SELECT * FROM ${tableName} WHERE email=?`,
      [email]
    );

    if (existingUser.length > 0) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = (await pool).execute(
      `INSERT INTO ${tableName} (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`
    );
    const result = { name, email, password };
    const token = generateToken(result);
    return result, token;
  } catch (error) {
    throw new Error("Error signing up: " + error.message);
  }
};

const login = async (email, password, isAdmin) => {
  const tableName = isAdmin ? "teachers" : "students";
  const pool = connectToDb();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM ${tableName} WHERE email = ?`,
      [email]
    );
    const existingUser = rows[0];

    if (!existingUser) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = generateToken(result);
    const user = { password, email };
    return user, token;
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

module.exports = { login, signup };
