import express from "express";
import { loginSchema, tokenSchema, registerSchema, authPhoneSchema, authEmailSchema, changePasswordSchema, existEmailSchema } from "../validations/auth.js";
import validator from "express-joi-validation";
import { check_object_id } from "../../middlewares/objectid-valid.js";
import login from "../services/auth/login.js";
import logout from "../services/auth/logout.js";
import refresh_token from "../services/auth/refresh.js";
import register from "../services/auth/register.js";
import phone from "../services/auth/auth_phone.js";
import email from "../services/auth/auth_email.js";
import exist_email from "../services/auth/exist_email.js";
import change_password from "../services/auth/change_password.js";

const router = express.Router();
const verify = validator.createValidator({});

router.post("/token", verify.body(loginSchema), login);

router.post("/logout/:user_id", check_object_id, logout);

router.post("/users", verify.body(registerSchema), register);

router.get("/refresh", verify.headers(tokenSchema), refresh_token);

router.get("/number/:phone", verify.params(authPhoneSchema), phone);

router.get("/email/:email", verify.params(authEmailSchema), email);

router.get("/email/exist/:email", verify.params(existEmailSchema), exist_email);

router.put("/password", verify.body(changePasswordSchema), change_password);

export default router;
