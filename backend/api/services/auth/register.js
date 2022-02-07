import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import Interest from "../../../models/Interest.js";

const register = async (req, res, next) => {
    try {
        const { email, password, name, birth, phone, address, college, major, grade, interest, gender } = req.body;
        const user_status = await User.exists({ email });
        if (user_status) {
            res.status(400).json({
                message: "해당 이메일이 이미 존재합니다.",
            });
            return;
        }
        const hash_password = bcrypt.hashSync(password, 10);

        let interest_documents = [];
        if (interest) {
            const interest_array = interest.split(" ");
            interest_documents = await Interest.find().where("name").in(interest_array).exec();
        }

        await User.collection.dropIndexes();

        await User.create({
            email,
            password: hash_password,
            name,
            birth,
            phone,
            address,
            college,
            major,
            grade,
            gender,
            interest: interest_documents,
        });
        res.status(201).json({
            message: "success register",
        });
    } catch (error) {
        next(error);
    }
};

export default register;
