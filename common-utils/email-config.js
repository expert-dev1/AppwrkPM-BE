const nodemailer = require("nodemailer");
const { EMAIL_HOST, EMAIL_PORT, EMAIL_FROM_USER_NAME, EMAIL_FROM_USER_PASSWORD } = require("../config/config");

var transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
        user: EMAIL_FROM_USER_NAME,
        pass: EMAIL_FROM_USER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
function sendEmail(mailOptions) {
    console.log('Inside send email from node : ', mailOptions);
    transport.sendMail(mailOptions).then((error, info) => {
        console.log('Inside send mail 1 -------');
        if (error) {
            console.log('Error in sending mail : ', error);
            return error
        } else {
            console.log('Mail sent sucessfully');
            transport.close();
        }        
        // console.log('Preview Url : ', nodemailer.getTestMessageUrl(info));
    });
}

// var send_email = function (email_content) {
//     console.log('Inside send email from node : ', mailOptions);
//     transport.sendMail(email_content, function (error, info) {
//         console.log('Inside send mail 1 -------');
//         if (error) {
//             console.log('Error in sending mail : ', error);
//         } else {
//             console.log('Message sent: ' + info.message);
//             transport.close();
//         }
//     })
// };


module.exports = sendEmail;