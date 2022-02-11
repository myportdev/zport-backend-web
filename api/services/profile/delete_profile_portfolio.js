import Profile from "../../../models/Profile.js";
import Portfolio from "../../../models/Portfolio.js";
import Project from "../../../models/Project.js";
import Certificate from "../../../models/Certificate.js";

const delete_project = async (req, res, next) => {
    try {
        const { id } = req.headers;
        console.log(id);
        const project = await Project.findByIdAndDelete(id, { new: true });
        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
};

const delete_certificate = async (req, res, next) => {
    try {
        const { id } = req.headers;
        const certificate = await Certificate.findByIdAndDelete(id, { new: true });
        res.status(200).json({ certificate });
    } catch (error) {
        next(error);
    }
};

export { delete_project };
export { delete_certificate };
