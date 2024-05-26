const express = require("express");
const enrollmentRouter = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");

enrollmentRouter.post("/create", enrollmentController.createEnrollment);
enrollmentRouter.get("/get/:id", enrollmentController.getEnrollments);
enrollmentRouter.delete("/delete", enrollmentController.deleteEnrollment);

module.exports = enrollmentRouter;
