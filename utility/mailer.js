const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer')


async function sendMailer(email, otpcode) {
    try {
        let transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            // host: 'smtp.gmail.com',
            auth: {
                user: "ciitlahore383@gmail.com", // generated ethereal user
                pass: "Abubaker@1234", // generated ethereal password
            },
        }));
        let info = await transporter.sendMail({

            from: 'ciitlahore383@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Email verification code", // Subject line
            text: "Hello world?", // plain text body
            html: `<p> Your Email verfication OTP == ${otpcode}  </p>` // html body
        })
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true
    } catch (error) {
        console.log('Something Went Wrongs', error);
    }
}

module.exports = sendMailer;