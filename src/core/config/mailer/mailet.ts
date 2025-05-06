import nodemailer from 'nodemailer';
export interface IEmailOptions{
  to: string
  subject: string
  text:string
}

const from = 'no-reply@testapp.com';
export const sendEmail = async ({ to, subject, text }: IEmailOptions) => {
  const transporter = nodemailer.createTransport({
    port: 1025,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from ,
    to,
    subject,
    text,
  });
};

