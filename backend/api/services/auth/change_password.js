import User from "../../../models/User.js";
import bcrypt from "bcryptjs";

const change_password = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        const result = bcrypt.compareSync(password, user.password);
        if (!result) {
            const hash_password = bcrypt.hashSync(password, 10);
            await User.findOneAndUpdate({ email }, { password: hash_password });
            res.status(200).json({
                message: "비밀번호가 정상적으로 변경되었습니다.",
            });
            return;
        }
        res.status(400).json({
            message: "전과 동일한 비밀번호를 입력했습니다.",
        });
    } catch (error) {
        next(error);
    }
};

export default change_password;
