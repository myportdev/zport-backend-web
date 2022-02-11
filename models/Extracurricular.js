import mongoose from "mongoose";
const Schema = mongoose.Schema;

const extracurricularSchema = Schema({
    image_url: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    start_at: {
        type: String,
        required: true,
    },
    end_at: {
        type: String,
        required: true,
    },
    eligibility: {
        type: String,
    },
    activities: {
        type: String,
    },
    benefits: {
        type: String,
    },
    detail_information: {
        type: String,
        required: true,
    },
    site_url: {
        type: String,
        required: true,
    },
    support_url: {
        type: String,
        required: true,
    },
    company_type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    founder: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    relation_category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interest",
        },
    ],
});
export default mongoose.model("Extracurricular", extracurricularSchema);
