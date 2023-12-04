import express from "express";
import {signup, signin, getAllUsers} from "../controllers/user.controller.js" 

const router = express.Router();

router.route("/api/signup").post(signup);
router.route("/api/signin").post(signin);
router.route("/api/allUsers").get(getAllUsers);

export default router;