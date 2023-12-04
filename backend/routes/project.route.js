import express from "express";
import {createProject, getAllProject} from "../controllers/project.controller.js" 

const router = express.Router();

router.route("/api/project").post(createProject).get(getAllProject);

export default router;