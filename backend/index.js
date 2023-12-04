import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./db/connection.js";
import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";
import issueRouter from "./routes/issue.route.js";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use(userRouter);
app.use(projectRouter);
app.use(issueRouter);

app.listen(PORT, ()=>{
    console.log("Server is listening on PORT http://localhost:" + PORT);
});