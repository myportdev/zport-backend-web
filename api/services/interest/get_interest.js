import Interest from "../../../models/Interest.js";

const get_interest = async (req, res, next) => {
    try {
        const find_interest = await Interest.find().select("name").exec();
        res.status(200).json({
            interest: find_interest,
        });
    } catch (error) {
        next(error);
    }
};

export default get_interest;
