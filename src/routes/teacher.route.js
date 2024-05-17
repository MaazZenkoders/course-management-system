const express = require("express");
const teacherRouter = express.Router();
const teacherController = require("../controllers/teacher.controller")

teacherRouter.get('/getAll',teacherController.getAllTeachers)
teacherRouter.put('/update/:id',teacherController.updateTeacherById)
teacherRouter.delete('/delete/:id',teacherController.deleteTeacherById)

module.exports=teacherRouter