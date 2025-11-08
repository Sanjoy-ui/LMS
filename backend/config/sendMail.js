import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD_EMAIL,
  },
});

const sendMail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Reset your password",
    
    html: `<p>Your otp for password reset is <b>${otp}</b> . It Expires in 5 minutes ! </p> `
  });

  console.log("Message sent:", info.messageId);
}

export default sendMail;