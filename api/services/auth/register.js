import User from "../../../models/User.js";

import mongoose from "mongoose";
import configuration from "../../../configuration.js";
import { WebClient, LogLevel } from "@slack/web-api";
import cache from "../../util/cache.js";
import moment from "moment";

const send = async (name, date, phone_number, email, total_join, today_join) => {
    const client = new WebClient(configuration().slack_api_token, {
        logLevel: LogLevel.DEBUG,
    });
    const channelId = "C033K9THDS6";

    try {
        const result = await client.chat.postMessage({
            channel: channelId,
            text: `${name}님이 가입하셨습니다. ${date} 
        이메일:${email} 
        오늘 가입자 수: ${today_join} 
        총 가입 자수:${total_join}`,
        });

        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

const register = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { email, name } = req.body;
        const user_status = await User.exists({ email });

        await session.commitTransaction();

        if (user_status) {
            res.status(400).json({
                message: "해당 이메일이 이미 존재합니다.",
            });
            session.endSession();
            return;
        }
        const join_date = `${moment().format("YYYY년 MM월 DD일")} ${moment().format("HH시 mm분")}`;
        const user = await User.create({
            email,
            name,
            join_date,
        });
        const total_join = await User.count();
        const join_data = await cache.get("today_join");

        await send(user.name, user.join_date, user.email, total_join, parseInt(join_data) + parseInt(1));
        await cache.set("today_join", parseInt(join_data) + parseInt(1));

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "success register",
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export default register;
