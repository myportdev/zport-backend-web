import express from "express";
import auth from "./controllers/auth.js";
import univerity from "./controllers/university.js";
import interest from "./controllers/interest.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/university", univerity);
router.use("/interest", interest);

export default router;
