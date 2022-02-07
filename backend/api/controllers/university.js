import express from "express";
import university from "../services/university/get_university.js";
const router = express.Router();

router.get("/", university);

export default router;
