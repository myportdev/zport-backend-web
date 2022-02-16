import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        maxlength: 500,
        required: true,
    },
    name: {
        type: String,
        maxlength: 10,
    },
    birth: {
        type: String,
        maxlength: 6,
    },
    phone: {
        type: String,
        maxlength: 11,
    },
    address: {
        type: String,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
    },
    major: {
        type: String,
    },
    grade: {
        type: String,
    },
    gender: {
        type: String,
    },
    interest_contest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
        },
    ],
    interest_extracurricular: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Extracurricular",
        },
    ],
    interest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interest",
        },
    ],

    promotion: {
        type: Boolean,
    },
});

export default mongoose.model("User", userSchema);
