import nodemailer from "nodemailer";
import { updateStatus } from "../models/database.js";


const sendEmail = async (id, email, content) => {
  try {
    console.log("starting sending email");
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Notification',
      text: content
    });
    console.log("email sent");
    updateStatus(id, "sent");
  }
  catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    updateStatus(id, "failed");
    throw error;
  }

};

const sendSMS = (phone, content) => {
  console.log(`Sending SMS to ${phone}: ${content}`);
};

const sendInApp = (userId, content) => {
  console.log(`In-app message to user ${userId}: ${content}`);
};

export { sendEmail, sendSMS, sendInApp };
