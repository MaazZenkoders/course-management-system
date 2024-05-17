const teacherService = require('../services/teacher.service')

const getAllTeachers = async (req,res) => {
    try {
        const teachers = await teacherService.getTeachers()
        res.status(200).json({
            teachers:teachers,
            message:"Data retrieved"
        })
    } catch (error) {
        res.status(500).json({
            message:"Couldnot retrieve data"
        })
    }
}

const updateTeacherById = async (req,res) => {
    const teacher_id = req.params.teacher_id
    const {name,email,password} = req.body
    try {
        const updatedTeacher = await teacherService.updateTeacher(teacher_id,name,email,password)
        res.status(201).json({
            updateTeacher:updatedTeacher,
            message:"Teacher updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Error while updating"
        })
    }
}

const deleteTeacherById = async (req,res) => {
    const teacher_id = req.params.teacher_id
    try {
        const deletedTeacher = await teacherService.deleteTeacher(teacher_id)
        res.status(202).json({
            deletedTeacher:deletedTeacher,
            message:"Teacher deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Deletion unsuccessful"
        })
    }
}

module.exports={getAllTeachers,updateTeacherById,deleteTeacherById}