import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        maxlength: 10,
    },

    join_date: {
        type: String,
    },
});

export default mongoose.model("User", userSchema);
