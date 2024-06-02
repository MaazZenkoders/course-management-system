const { generateToken } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { connectToDb } = require("../utils/db");

const signup = async (name, email, password, role) => {
  const tableName = role === "admin" ? "teachers" : "students";
  const pool = connectToDb();

  if (!name || !email || !password || !role) {
    return null;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = (await pool).execute(
      `INSERT INTO ${tableName} (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`
    );
    const result = { name, email, hashedPassword, role };
    const token = generateToken(newUser);
    return { result, token };
  } catch (error) {
    throw new Error("Error signing up: " + error.message);
  }
};

const login = async (email, password, role) => {
  const tableName = role === "admin" ? "teachers" : "students";
  const pool = connectToDb();

  if (!email || !password || !role) {
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
    const user = { password, email };
    const token = generateToken(user);
    return { user, token };
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

module.exports = { login, signup };
