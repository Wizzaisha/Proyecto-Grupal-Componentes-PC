require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const {
    EMAIL_PR,
    PASSWORD_EMAIL,
    REFRESH_TOKEN,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env;

const myOAuth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

myOAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const myAccessToken = myOAuth2Client.getAccessToken();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: EMAIL_PR,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: myAccessToken
    }
})

function sendEmail (email, data) {

    let mailOptions = {
        from: EMAIL_PR,
        to: email,
        subject: `Receipt from Henry Hardware`,
        html: `<h1>Thanks for your purchase</h1><hr><p>Dear user, here is a link to your receipt details</p><hr><p>${data}</p>`
    }

    transport.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            transport.close();
            console.log("Email has been sent: check your inbox!");
        }
    });
}

module.exports = { sendEmail };



