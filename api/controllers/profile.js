import { Router } from "express";
const router = Router();
import authJWT from "../../middlewares/authJWT.js";
import upload from "../../middlewares/uploads.js";
import { get_profile, get_portfolio, get_project, get_certificate } from "../services/profile/get_profile_portfolio.js";
import { create_profile, create_portfolio, create_project, create_certificate } from "../services/profile/create_profile_portfolio.js";
import { update_profile, update_portfolio, update_project, update_certificate } from "../services/profile/update_profile_portfolio.js";
import { delete_project, delete_certificate } from "../services/profile/delete_profile_portfolio.js";

import { profileSchema } from "../validations/profile.js";
import validator from "express-joi-validation";
const verify = validator.createValidator({});

// get
// get - profile
router.get("/", authJWT, get_profile);
// get - portfolio
router.get("/portfolio", authJWT, get_portfolio);
// get - project
router.get("/portfolio/project", authJWT, get_project);
// get - certificate
router.get("/portfolio/certificate", authJWT, get_certificate);

// create
// create - profile
router.post("/", authJWT, create_profile);
// create - portfolio
router.post("/portfolio", authJWT, create_portfolio);
// create - project
router.post("/portfolio/project", authJWT, create_project);
// create - certificate
router.post("/portfolio/certificate", authJWT, create_certificate);

// update
// update - profile
router.patch("/", authJWT, verify.body(profileSchema), upload.single("image"), update_profile);
// update - portfolio
router.patch("/portfolio", authJWT, update_portfolio);
// update - project
router.patch("/portfolio/project/:project_id", update_project);
// update - certificate
router.patch("/portfolio/certificate/:certificate_id", update_certificate);

// delete
// delete - project
router.delete("/portfolio/project", delete_project);
// delete - certificate
router.delete("/portfolio/certificate", delete_certificate);

export default router;
