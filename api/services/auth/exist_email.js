import User from "../../../models/User.js";
import mongoose from "mongoose";

const exist_email = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { email } = req.params;
        const user_status = await User.exists({ email });
        await session.commitTransaction();
        session.endSession();
        if (user_status) {
            res.status(400).json({
                message: "해당 이메일이 이미 존재합니다.",
            });
            return;
        }

        res.status(200).json({
            message: "해당 이메일 사용가능합니다.",
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export default exist_email;
