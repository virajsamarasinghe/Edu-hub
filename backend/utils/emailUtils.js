const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send verification code and link
const sendVerificationCode = (email, code, token) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${code}\n\nYou can also verify your email by clicking on the following link:\n${verificationLink}`,
    html: `
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>You can also verify your email by clicking on the following link:</p>
      <a >${verificationLink }</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Function to send student ID email
const sendStudentIdEmail = (email, studentId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Student ID',
    text: `Your student ID is: ${studentId}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendEmailReceipt = (email, subject, text) => {
  const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: subject,
      text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
};

module.exports = {
  sendVerificationCode,
  sendStudentIdEmail,
  sendEmailReceipt,
};


// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const mailOptions = {
//   from: process.env.EMAIL_USER,
//   to: 'champikev@gmail.com', // Replace with your test email
//   subject: 'Test Email',
//   text: 'This is a test email sent using Nodemailer.',
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error sending email:', error);
//   } else {
//     console.log('Test email sent:', info.response);
//   }
// });
