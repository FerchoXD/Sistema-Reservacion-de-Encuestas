import nodemailer from 'nodemailer';
import "dotenv/config"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '213497@ids.upchiapas.edu.mx',
        pass: process.env.EMAIL_CREDENTIAL
    },
    tls: {
        rejectUnauthorized: false,
    },
})

transporter.verify().then(() => {
    console.log('Ready for sends emails');
})

export { transporter }