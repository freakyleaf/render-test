import express from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const router = express.Router();

const { EMAIL_FROM, EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_TO, EMAIL_USER } = process.env;

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

router.post('/', async (req, res) => {
    const email = {
        from: EMAIL_FROM,
        'reply-to': req.body.senderEmail,
        subject: `Suggest An Edit: ${req.body.itemName} ${req.body.itemCategory}`,
        text: `From: ${req.body.senderName}\nEmail: ${req.body.senderEmail}\n\n${req.body.body}`,
        to: EMAIL_TO,
    };
    try {
        const sentEmail = await transporter.sendMail(email);
        res.json(sentEmail.response);
        res.status(201);
    } catch (error) {
        res.json(error);
        res.status(400);
    }
});

export default router;
