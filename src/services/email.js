import nodemailer from "nodemailer";

export async function sendEmail(dest, subject, message, attachments = []) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.NODEMAILEREMAIL,
      pass: process.env.NODEMAILERPASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"RAGAB" <${process.env.NODEMAILEREMAIL}>`,
    to: dest,
    subject,
    html: message,
    attachments,
  });
  return info;
}
