import 'dotenv/config';

export default {
    port: process.env.PORT ,
    mongo_uri: process.env.MONGO_URI,
    elastiemail_api_key: process.env.ELASTICEMAIL_API_KEY,
    email_user : process.env.EMAIL_USER,
    node_mailer_user :process.env.NODE_MAILER_USER,
    node_mailer_pass : process.env.NODE_MAILER_PASS,
    otpKey: process.env.OTPKEY,
    jwt_key: process.env.JWT_KEY,
}