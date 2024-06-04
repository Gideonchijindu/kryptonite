import nodemailer from 'nodemailer';
import env from './env.js';

export const sendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: env.node_mailer_user,
            pass: env.node_mailer_pass
        }
    });

    const mailOptions = {
        from: 'Krptonite <gideonnwande@gmail.com>',
        to: data.email,
        subject: data.subject,
        html: data.html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
