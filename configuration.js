import { config } from "dotenv";
config();

const port = process.env.PORT;
const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;
const database_url_1 = process.env.DATABASE_URL1;
const database_url_2 = process.env.DATABASE_URL2;
const twilio_accountsid = process.env.TWILIO_ACCOUNTSID;
const twilio_authtoken = process.env.TWILIO_AUTHTOKEN;
const secret = process.env.SECRET;
const google_user = process.env.GOOGLE_USER;
const google_pass = process.env.GOOGLE_PASS;

export default () => ({
    port,
    admin_email,
    admin_password,
    database_url_1,
    database_url_2,
    twilio_accountsid,
    twilio_authtoken,
    secret,
    google_user,
    google_pass,
});
