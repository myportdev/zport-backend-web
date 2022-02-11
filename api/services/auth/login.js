import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import cache from "../../util/cache.js";
import jwt_util from "../../util/jwt-util.js";

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();

        if (user) {
            const result_password = bcrypt.compareSync(password, user.password);
            if (result_password) {
                const accessToken = jwt_util.sign(user.id);
                const refreshToken = jwt_util.refresh();
                await cache.set(user.id, refreshToken);
                res.status(200).json({
                    message: "success login",
                    token: {
                        accessToken,
                        refreshToken,
                    },
                });
                return;
            }
        }
        res.status(401).json({
            message: "fail login",
        });
    } catch (error) {
        next(error);
    }
};

export default login;
