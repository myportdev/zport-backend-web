import mongoose from "mongoose";
import configuration from "../configuration.js";

const connect = () => {
    mongoose
        .connect(configuration().database_url_1, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected..."))
        .catch((err) => console.log("err당" + err));
};

export default connect;
