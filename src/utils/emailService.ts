import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
    host: "smtp.gmail.com",
    port: 465, 
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false 
    }
});

const sendResetEmail = async (email: string, resetToken: string) => {
  const resetLink = `http://localhost:3000/api/v1/users/reset-password/${resetToken}`;

  const mailOptions = {
    from: {
      name :"Fundoo Notes",
      address:process.env.EMAIL_USER},
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h3>You requested a password reset</h3>
      <p>Please click the link below to reset your password:</p>
      <p>${resetLink}</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
    // <a href="${resetLink}">Reset Password</a> */
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Reset email sent' };
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw new Error('Error sending email');
  }
};

export { sendResetEmail };
