import jwt_util from "../../util/jwt-util.js";
import jwt from "jsonwebtoken";

const refresh_token = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.refresh) {
            res.status(400).send({
                ok: false,
                message: "Access token and refresh token are need for refresh!",
            });
        }
        const authToken = req.headers.authorization.split("Bearer ")[1];
        const refreshToken = req.headers.refresh;
        const authResult = jwt_util.verify(authToken);

        const decoded = jwt.decode(authToken);

        if (decoded === null) {
            res.status(401).send({
                ok: false,
                message: "No authorized!",
            });
            return;
        }
        const refreshResult = await jwt_util.refreshVerify(refreshToken, decoded.id);
        if (!authResult.ok && authResult.message === "jwt expired") {
            if (!refreshResult) {
                res.status(401).json({
                    ok: false,
                    message: "No authorized",
                });
            } else {
                const newAccesstoken = jwt_util.sign(decoded.id);
                res.status(200).json({
                    message: "issued accesstoken",
                    token: {
                        accessToken: newAccesstoken,
                        refreshToken,
                    },
                });
            }
        } else {
            res.status(400).json({
                ok: false,
                message: "Acess token is not expired!",
            });
        }
    } catch (error) {
        next(error);
    }
};

export default refresh_token;
