import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = Schema({
    portfolio: { ref: "Portfolio", type: Schema.Types.ObjectId },
    thumbnail_image_url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Project", projectSchema);
