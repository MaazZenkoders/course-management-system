const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const authRouter = require("./src/routes/auth.route");
const teacherRouter = require("./src/routes/teacher.route");
const studentRouter = require("./src/routes/student.route");
const courseRouter = require("./src/routes/course.route");
const enrollmentRouter = require("./src/routes/enrollment.route");
const { connectToDb } = require("./src/utils/db");
dotenv.config();

const app = express();
const port = 4000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use("/api/auth", authRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);
app.use("/api/course", courseRouter);
app.use("/api/enrollment", enrollmentRouter);

app.listen(port, async () => {
  await connectToDb();
  console.log(`Server listening on port ${port}`);
});
