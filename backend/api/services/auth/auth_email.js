import User from "../../../models/User.js";
import nodemailer from "nodemailer";
import configuration from "../../../configuration.js";

let random_number = (min, max) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
};

const mailSender = {
    sendGmail: function (param) {
        const rd_number = random_number(11111, 99999);
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: configuration().google_user,
                pass: configuration().google_pass,
            },
        });

        let mailOptions = {
            from: process.env.GOOGLE_USER,
            to: param.toEmail,
            subject: param.subject,
            text: param.text + rd_number,
        };

        transporter.sendMail(mailOptions);
        transporter.close();
        return rd_number;
    },
};

const auth_email = async (req, res, next) => {
    const { email } = req.params;
    const exist = await User.exists({ email });
    if (!exist) {
        res.status(400).json({
            message: "해당 이메일이 존재하지 않습니다.",
        });
        return;
    }
    let emailParam = {
        toEmail: email, // 수신할 이메일

        subject: "ZPORT - 해당 링크를 통해 비밀번호를 재설정 해주세요", // 메일 제목

        text: ``, // 메일 내용
    };
    console.log(configuration().google_user);
    console.log(configuration().google_pass);
    const rd_number = await mailSender.sendGmail(emailParam);

    res.status(200).json({
        number: rd_number,
    });
};

export default auth_email;
