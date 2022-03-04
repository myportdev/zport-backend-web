import express from "express";
import { registerSchema } from "../validations/auth.js";
import validator from "express-joi-validation";
import register from "../services/auth/register.js";

const router = express.Router();
const verify = validator.createValidator({});

router.post("/users", verify.body(registerSchema), register);

export default router;
