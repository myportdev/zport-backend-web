import cache from "../../util/cache.js";
import User from "../../../models/User.js";
import mongoose from "mongoose";

const logout = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { user_id } = req.params;
        const user_status = await User.exists({ _id: user_id });
        await session.commitTransaction();
        session.endSession();
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
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export default logout;
