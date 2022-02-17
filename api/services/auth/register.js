import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import Interest from "../../../models/Interest.js";
import University from "../../../models/University.js";
import mongoose from "mongoose";
import configuration from "../../../configuration.js";
import { WebClient, LogLevel } from "@slack/web-api";
import cache from "../../util/cache.js";

const send = async (name, date, phone_number, email, total_join, today_join) => {
    const client = new WebClient(configuration().slack_api_token, {
        logLevel: LogLevel.DEBUG,
    });
    const channelId = "C033K9THDS6";

    try {
        const result = await client.chat.postMessage({
            channel: channelId,
            text: `${name}님이 가입하셨습니다. ${date} 
        전화번호:${phone_number} 
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
        const { email, password, name, birth, phone, address, college, major, grade, interest, gender, promotion } = req.body;
        const hash_password = bcrypt.hashSync(password, 10);
        const user_status = await User.exists({ email });
        await session.commitTransaction();
        if (user_status) {
            res.status(400).json({
                message: "해당 이메일이 이미 존재합니다.",
            });
            session.endSession();
            return;
        }
        let interest_documents = [];
        if (interest) {
            const interest_array = interest.split(" ");
            interest_documents = await Interest.find().where("name").in(interest_array).exec();
        }

        const user_college = await University.findOne({ university_name: college }).exec();

        const user = await User.create({
            email,
            password: hash_password,
            name,
            birth,
            phone,
            address,
            college: user_college,
            major,
            grade,
            gender,
            interest: interest_documents,
            promotion,
        });
        const total_join = await User.count();
        const join_data = await cache.get("today_join");

        await send(user.name, user.join_date, user.phone, user.email, total_join, parseInt(join_data) + parseInt(1));
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
