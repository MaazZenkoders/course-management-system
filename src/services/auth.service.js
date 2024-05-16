const { generateToken } = require("../middlewares/auth");
const bcrypt = require("bcrypt")
const { connectToDb } = require("../utils/db")

const signup = async (name, email, password,isAdmin) => {
    const tableName = isAdmin? 'teachers': 'students' 
    const pool = connectToDb()
    if (!name || !email || !password) {
        return null;
    }
        try {
            const existingUser = pool.query(`SELECT * FROM ${tableName} WHERE email = ${email}`);
            if (existingUser.length > 0) {
                throw new Error('Email already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = pool.query(`INSERT INTO ${tableName} (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`);
            
            const token = generateToken(newUser);
            return {token, newUser}
        } catch (error) {
            throw new Error('Error signing up: ' + error.message);
        }
    };
  

const login = async (email, password) => {
    if (!email || !password) {
        return null;
    }
};

module.exports = { login, signup };