import mongoose from "mongoose";
const Schema = mongoose.Schema;

const interestSchema = Schema({
    name: {
        type: String,
    },
});

export default mongoose.model("Interest", interestSchema);
