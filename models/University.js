import mongoose from "mongoose";
const Schema = mongoose.Schema;

const universitySchema = Schema({
    university_name: {
        type: String,
        required: true,
    },
    major_name: [
        {
            type: String,
            required: true,
        },
    ],
});

export default mongoose.model("University", universitySchema);
