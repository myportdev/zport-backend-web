import University from "../../../models/University.js";
import cache from "../../util/cache.js";

const get_university = async (req, res, next) => {
    try {
        let university_data;
        const data = await cache.get("university");
        if (!data) {
            university_data = await University.find().exec();
            await cache.set("university", JSON.stringify(university_data));
        } else {
            university_data = await cache.get("university");
            university_data = JSON.parse(university_data);
        }
        res.status(200).json({ university_data });
    } catch (error) {
        next(error);
    }
};

export default get_university;
