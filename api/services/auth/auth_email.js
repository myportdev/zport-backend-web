import User from "../../../models/User.js";
import nodemailer from "nodemailer";
import configuration from "../../../configuration.js";
import jwt from "jsonwebtoken";
const secret = configuration().secret;
import mongoose from "mongoose";
const mailSender = {
    sendGmail: function (param) {
        let transporter = nodemailer.createTransport({
            host: "smtp.worksmobile.com",
            port: 587,
            auth: {
                user: configuration().google_user,
                pass: configuration().google_pass,
            },
        });

        let mailOptions = {
            from: process.env.GOOGLE_USER,
            to: param.toEmail,
            subject: param.subject,
            text: param.text,
        };

        transporter.sendMail(mailOptions);
        transporter.close();
        return;
    },
};

const auth_email = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { email } = req.params;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(400).json({
                message: "해당 이메일이 존재하지 않습니다.",
            });
            return;
        }

        const token = jwt.sign({ id: user.id }, secret, {
            algorithm: "HS256",
            expiresIn: "300000",
        });

        let emailParam = {
            toEmail: email, // 수신할 이메일

            subject: "해당 링크를 5분내로 클릭해주세요.", // 메일 제목

            text: `https://myport.info/reset?authtoken=${token}`, // 메일 내용
        };

        mailSender.sendGmail(emailParam);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: "성공적으로 이메일을 보냈습니다.",
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export default auth_email;
