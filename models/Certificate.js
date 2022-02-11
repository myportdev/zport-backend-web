import mongoose from "mongoose";
const Schema = mongoose.Schema;

const certificateSchema = Schema({
    portfolio: { ref: "Portfolio", type: Schema.Types.ObjectId },
    title: {
        type: String,
    },
    acquire_at: {
        type: String,
    },
    certified: {
        type: Boolean,
    },
});

export default mongoose.model("Certificate", certificateSchema);
