import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import jwt_util from "../../util/jwt-util.js";
import mongoose from "mongoose";

const change_password = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { token, password } = req.body;
        const token_result = jwt_util.verify(token);
        if (!token_result.ok) {
            if (token_result.message === "jwt expired") {
                res.status(400).json({
                    message: "토큰이 만료되었습니다.",
                });
                return;
            }
            res.status(400).json({
                message: "해당 token이 유효하지 않습니다.",
            });
            return;
        }

        const user = await User.findById(token_result.id).exec();
        await session.commitTransaction();
        const result = bcrypt.compareSync(password, user.password);
        if (!result) {
            const hash_password = bcrypt.hashSync(password, 10);
            await User.findByIdAndUpdate(token_result.id, { password: hash_password }).exec();
            await session.commitTransaction();
            session.endSession();
            res.status(200).json({
                message: "비밀번호가 정상적으로 변경되었습니다.",
            });
            return;
        }
        session.endSession();
        res.status(400).json({
            message: "전과 동일한 비밀번호를 입력했습니다.",
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export default change_password;
