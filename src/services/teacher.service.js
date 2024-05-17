const { connectToDb } = require("../utils/db")

const getTeachers = async () => {
    const pool = await  connectToDb()
    try {
        const [teachers] = await pool.query(`SELECT * FROM teachers`)
        return(teachers)
    } catch (error) {
        throw new Error("Error while retrieving data")
    }
}

const updateTeacher = async (name,email,password,teacher_id) => {
    const pool = await connectToDb()
    try {
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            `UPDATE teachers SET name = ?, email = ?, password = ? WHERE teacher_id = ${teacher_id}`,
            [name, email, hashedPassword]
        );

        if (result.affectedRows === 0) {
            throw new Error(`No teacher found with id ${teacher_id}`);
        }

        const data = {name,email,password}
        return(data)
    } catch (error) {
        throw new Error(`Error updating teacher: ${error.message}`);
    }
}

const deleteTeacher = async (teacher_id) => {
    const pool = await connectToDb()
    try {
        const [result] = await pool.query(`DELETE FROM teachers WHERE teacher_id = ?`,[teacher_id])
        if (result.affectedRows === 0) {
            throw new Error(`No teacher found with id ${teacher_id}`);
        }
        return (teacher_id)
    } catch (error) {
        throw new Error(`Error deleting teacher: ${error.message}`);
    }
}

module.exports={getTeachers,updateTeacher,deleteTeacher}