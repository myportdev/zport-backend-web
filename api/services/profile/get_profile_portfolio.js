import Profile from "../../../models/Profile.js";
import Portfolio from "../../../models/Portfolio.js";
import Project from "../../../models/Project.js";
import Certificate from "../../../models/Certificate.js";

const get_profile = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        const profile = await Profile.findOne({ user: user_id })
            .populate({
                path: "user",
                select: "name college major",
            })
            .exec();
        res.status(200).json({ profile });
    } catch (error) {
        next(error);
    }
};

const get_portfolio = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        const portfolio = await Portfolio.findOne({ user: user_id }).exec();
        res.status(200).json({ portfolio });
    } catch (error) {
        next(error);
    }
};

const get_project = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        const portfolio = await Portfolio.findOne({ user: user_id }).exec();
        const project = await Project.find({ portfolio: portfolio.id });
        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
};
const get_certificate = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        const portfolioId = await Portfolio.findOne({ userId: user_id }).exec();
        const certificate = await Certificate.find({ portfolioId: portfolioId }).exec();
        res.status(200).json({ certificate });
    } catch (error) {
        next(error);
    }
};

export { get_profile };
export { get_portfolio };
export { get_project };
export { get_certificate };
