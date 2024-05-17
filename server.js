const express = require("express");
const dotenv = require("dotenv");
const authRouter = require('./src/routes/auth.route')
const teacherRouter = require('./src/routes/teacher.route')
const studentRouter = require('./src/routes/student.route')
const { connectToDb } = require("./src/utils/db");
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/teacher",teacherRouter)
app.use("/api/student",studentRouter)

app.listen(port, async () => {
  await connectToDb()
  console.log(`Server listening on port ${port}`);
});
