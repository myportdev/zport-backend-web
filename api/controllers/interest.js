import express from "express";
import interest from "../services/interest/get_interest.js";
const router = express.Router();

router.get("/", interest);

export default router;
