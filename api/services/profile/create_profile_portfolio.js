import Profile from "../../../models/Profile.js";
import Portfolio from "../../../models/Portfolio.js";
import Project from "../../../models/Project.js";
import Certificate from "../../../models/Certificate.js";
import User from "../../../models/User.js";

const create_profile = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        const profile_status = await Profile.exists({ user: user_id });
        if (!profile_status) {
            const profile = await new Profile({ user: user_id });
            profile.save();
            res.status(201).json({ profile });
            return;
        }
        res.status(400).json({
            message: "해당 유저의 프로필이 이미 존재합니다.",
        });
    } catch (error) {
        next(error);
    }
};

const create_portfolio = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        const portfolio_status = await Portfolio.exists({ user: user_id });
        if (!portfolio_status) {
            const portfolio = await new Portfolio({ user: user_id });
            portfolio.save();
            res.status(201).json({ portfolio });
            return;
        }
        res.status(400).json({
            message: "해당 유저의 포트폴리오가 이미 존재합니다.",
        });
    } catch (error) {
        next(error);
    }
};

const create_project = async (req, res, next) => {
    try {
        const { thumbnail_image_url, title, period, team, summary } = req.body;
        const user_id = res.locals.user_id;
        const portfolio = await Portfolio.findOne({ user: user_id });
        const project = await new Project({
            portfolio,
            thumbnail_image_url,
            title,
            period,
            team,
            summary,
        });
        project.save();
        res.status(201).json({ project });
    } catch (error) {
        next(error);
    }
};

const create_certificate = async (req, res, next) => {
    try {
        const { title, acquire_at } = req.body;
        const user_id = res.locals.user_id;
        const portfolio = await Portfolio.findOne({ user: user_id });
        const certificate = await new Certificate({
            portfolio,
            title,
            acquire_at,
            certified: false,
        });
        certificate.save();
        res.status(201).json({ certificate });
    } catch (error) {
        next(error);
    }
};

export { create_profile };
export { create_portfolio };
export { create_project };
export { create_certificate };
