import Profile from "../../../models/Profile.js";
import Portfolio from "../../../models/Portfolio.js";
import Project from "../../../models/Project.js";
import Certificate from "../../../models/Certificate.js";
import User from "../../../models/User.js";
import aws from "aws-sdk";
import path from "path";
const __dirname = path.resolve();
aws.config.loadFromPath(__dirname + "/config/s3.json");
let s3 = new aws.S3();

const update_profile = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        if (req.file) {
            const find_profile = await Profile.findOne({ user: user_id });
            console.log(find_profile.profile_image_url);
            console.log(find_profile.profile_image_url.substring(68, find_profile.profile_image_url.length));
            if (find_profile.profile_image_url !== undefined && find_profile.profile_image_url !== "") {
                s3.deleteObject(
                    {
                        Bucket: "zport-bucket/profile_images",
                        Key: find_profile.profile_image_url.substring(68, find_profile.profile_image_url.length),
                    },
                    (error, data) => {
                        if (error) {
                            throw error;
                        }
                    }
                );
            }
            const profile = await Profile.findOneAndUpdate({ user: user_id }, { profile_image_url: req.file.location }, { new: true });
            res.status(200).json({ profile });
            return;
        }
        if (req.body.profile) {
            let profile;
            if (!req.body.profile.links) {
                profile = await Profile.findOneAndUpdate({ user: user_id }, { ...req.body.profile }, { new: true });
            } else {
                const find_profile = await Profile.findOne({ user_id });
                const find_index = await find_profile["links"].findIndex((data) => data.title == req.body.profile.links.title);
                if (find_index === -1) {
                    profile = await Profile.findOneAndUpdate({ user: user_id }, { $push: { ...req.body.profile } }, { new: true });
                } else {
                    find_profile["links"][find_index]["url"] = req.body.profile.links.url;
                    res.status(200).json({ find_profile });
                    return;
                }
            }
            res.status(200).json({ profile });
            return;
        }
        if (req.body.user) {
            const user = await User.findByIdAndUpdate(user_id, { ...req.body.user }, { new: true });
            res.status(200).json({ user });
            return;
        }
    } catch (error) {
        next(error);
    }
};

const update_portfolio = async (req, res, next) => {
    try {
        const user_id = res.locals.user_id;
        let portfolio;
        if (req.body.short_intro) {
            portfolio = await Portfolio.findOneAndUpdate({ user: user_id }, { ...req.body }, { new: true });
            res.status(200).json({ portfolio });
            return;
        }
        if (req.body.push) {
            portfolio = await Portfolio.findOneAndUpdate({ user_id }, { $push: { ...req.body.push } }, { new: true });
        } else if (req.body.delete) {
            portfolio = await Portfolio.findOneAndUpdate({ user_id }, { $pull: { ...req.body.delete } }, { new: true });
        } else if (req.body.update) {
            portfolio = await Portfolio.findOne({ user_id });
            const find_index = await portfolio[req.body.update.name].findIndex((data) => data._id == req.body.update.id);
            portfolio[req.body.update.name][find_index] = req.body.update.data;
        }
        res.status(200).json({ portfolio });
    } catch (error) {
        next(error);
    }
};

const update_project = async (req, res, next) => {
    try {
        const { project_id } = req.params;
        const project = await Project.findByIdAndUpdate(project_id, { ...req.body }, { new: true });
        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
};

const update_certificate = async (req, res, next) => {
    try {
        const { certificate_id } = req.params;
        const certificate = await Certificate.findByIdAndUpdate(certificate_id, { ...req.body }, { new: true });
        res.status(200).json({ certificate });
    } catch (error) {
        next(error);
    }
};

export { update_profile };
export { update_portfolio };
export { update_project };
export { update_certificate };
