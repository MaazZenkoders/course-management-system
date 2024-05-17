const express = require("express");
const studentRouter = express.Router();
const studentController = require("../controllers/student.controller")

studentRouter.get('/getAll',studentController.getAllStudents)
studentRouter.put('/update/:id',studentController.updateStudentById)
studentRouter.delete('/delete/:id',studentController.deleteStudentById)

module.exports=studentRouter