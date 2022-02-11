import express from "express";
<<<<<<< HEAD
import auth from "./controllers/auth.js";
import univerity from "./controllers/university.js";
import interest from "./controllers/interest.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/university", univerity);
router.use("/interest", interest);
=======
import interest from "../services/interest/get_interest.js";
const router = express.Router();

router.get("/", interest);
>>>>>>> develop

export default router;
