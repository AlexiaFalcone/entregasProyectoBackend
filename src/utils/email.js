import nodemailer from "nodemailer";
import { emailConection, passwordConection } from "../config/database.js";

const transporter = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user: emailConection,
        pass: passwordConection
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export const sendDeleteEmail = async (email)=> {
    await transporter.sendMail({
        from: emailConection,
        to: email,
        subject: 'Cuenta eliminada por inactividad',
        html: `
        <div>
        <p>Su cuenta fue eliminada por inactividad</p>
        </div>       `
    });
};