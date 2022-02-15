import cache from "../../util/cache.js";
import User from "../../../models/User.js";

const logout = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const user_status = await User.exists({ _id: user_id });

        if (!user_status) {
            res.status(400).json({
                message: "fail logout",
            });
            return;
        }
        await cache.del(user_id);
        res.status(200).json({
            message: "success logout",
        });
    } catch (error) {
        next(error);
    }
};

export default logout;
