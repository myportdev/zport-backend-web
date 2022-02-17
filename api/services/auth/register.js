import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import Interest from "../../../models/Interest.js";
import University from "../../../models/University.js";
import mongoose from "mongoose";

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

        await User.create({
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
