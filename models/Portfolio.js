import mongoose from "mongoose";
const Schema = mongoose.Schema;
const portfolioSchema = Schema({
    short_intro: {
        type: String,
    },
    summary: [
        {
            content: {
                type: String,
            },
        },
    ],
    user: { ref: "User", type: Schema.Types.ObjectId },
    recommend: [
        {
            userId: { ref: "User", type: Schema.Types.ObjectId },
            relation: {
                type: String,
            },
            content: {
                type: String,
            },
        },
    ],
    duty_career: [
        {
            title: {
                type: String,
            },
            start_at: {
                type: String,
            },
            end_at: {
                type: String,
            },
            description: {
                type: String,
            },
            quarantors: [],
        },
    ],
    award_career: [
        {
            title: {
                type: String,
            },
            start_at: {
                type: String,
            },
            end_at: {
                type: String,
            },
            description: {
                type: String,
            },
            quarantors: [],
        },
    ],

    skills: [
        {
            tag: {
                type: String,
            },
            level: {
                type: Number,
            },
        },
    ],
});

export default mongoose.model("Portfolio", portfolioSchema);
