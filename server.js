const express = require("express");
const dotenv = require("dotenv");
const authRouter = require('./src/routes/auth.route')
const { connectToDb } = require("./src/utils/db");
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(port, async () => {
  await connectToDb()
  console.log(`Server listening on port ${port}`);
});
