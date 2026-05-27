const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Set up the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP host (e.g., SendGrid, Outlook)
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'pfitness72@gmail.com',
        pass: 'FitnessPl@net12' // Use an App Password for Gmail!
    }
});

app.post('/send-email', (req, res) => {
    const { to_email, user_name } = req.body;

    const mailOptions = {
        from: 'pfitness72@gmail.com',
        to: to_email,
        subject: 'Welcome to Fitness Planet',
        text: `Hello ${user_name}, welcome to Fitness Planet!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent successfully');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});