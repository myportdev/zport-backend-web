import express, { json, urlencoded } from "express";
const app = express();
import configuration from "./configuration.js";
import cors from "cors";
import logger from "./middlewares/logger.js";
import { apiLimiter } from "./middlewares/api-limit.js";
import helmet from "helmet";
import { scheduleJob } from "node-schedule";
import cache from "./api/util/cache.js";

import AdminBro from "admin-bro";
import AdminBroExpress from "@admin-bro/express";
import AdminBroMongoose from "@admin-bro/mongoose";

import User from "./models/User.js";
import Interest from "./models/Interest.js";
import University from "./models/University.js";
import Contest from "./models/Contest.js";
import Extracurricular from "./models/Extracurricular.js";
import Portfolio from "./models/Portfolio.js";
import Profile from "./models/Profile.js";
import Project from "./models/Project.js";
import Certificate from "./models/Certificate.js";
import mongoose from "mongoose";

import connect from "./models/index.js";
connect();

import api from "./api/index.js";

const express_server = () => {
    AdminBro.registerAdapter(AdminBroMongoose);

    const adminBro = new AdminBro({
        databases: [mongoose],
        rootPath: "/admin",
    });
    const ADMIN = {
        email: configuration().admin_email,
        password: configuration().admin_password,
    };
    const router = AdminBroExpress.buildAuthenticatedRouter(
        adminBro,
        {
            cookieName: "adminBro",
            cookiePassword: "zport1234@",
            authenticate: async (email, password) => {
                if (ADMIN.password === password && ADMIN.email === email) {
                    return ADMIN;
                }
                return null;
            },
        },
        null,
        {
            resave: false,
            saveUninitialized: true,
        }
    );

    app.use(cors());
    app.use(logger());
    app.use(adminBro.options.rootPath, router);
    app.use(helmet());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use("/api", apiLimiter, api);

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });

    const j = scheduleJob("* * 0 * * *", async () => {
        await cache.set("today_join", 0);
    });

    app.listen(configuration().port, () => {
        console.log(`server is running ${configuration().port}`);
    });
};

express_server();
