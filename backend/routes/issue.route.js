import express from "express";
import {getRaisedIssues, raiseIssue, removeIssue, updateIssue} from "../controllers/issue.controller.js";

const router = express.Router();

router.route('/api/issue').get(getRaisedIssues);
router.route('/api/issue').post(raiseIssue);
router.route('/api/issue/:id').delete(removeIssue).put(updateIssue);

export default router;