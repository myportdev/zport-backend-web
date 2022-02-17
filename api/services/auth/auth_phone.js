import User from "../../../models/User.js";
import twilio from "twilio";
import configuration from "../../../configuration.js";
import mongoose from "mongoose";

let client = new twilio(configuration().twilio_accountsid, configuration().twilio_authtoken);

let random_number = (min, max) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
};

const numberSender = {
    sendNumber: async function (number) {
        const rd_number = await random_number(11111, 99999);
        client.messages.create({
            body: "ZPORT 회원가입 인증 번호를 입력해주세요 : " + rd_number,
            to: "+82" + number,
            from: "+19402456656",
        });
        return rd_number;
    },
};

const auth_phone_number = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { phone } = req.params;
        const user_status = await User.exists({ phone });
        await session.commitTransaction();
        session.endSession();
        if (user_status || !phone) {
            res.status(400).json({
                message: "해당 번호를 이미 사용중이거나 번호를 제대로 입력해주세요",
            });
            return;
        }
        const random_number = await numberSender.sendNumber(phone);

        res.status(200).json({
            number: random_number,
        });
    } catch (error) {
        next(error);
    }
};

export default auth_phone_number;
