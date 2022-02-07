import mongoose from "mongoose";
const Schema = mongoose.Schema;
const profileSchema = Schema({
    profile_image_url: {
        type: String,
    },
    user: { ref: "User", type: Schema.Types.ObjectId },
    status: {
        type: String,
    },
    desired_job: {
        type: String,
    },
    links: [
        {
            title: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    ],
});

export default mongoose.model("Profile", profileSchema);
