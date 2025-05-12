import nodemailer from 'nodemailer';
export interface IEmailOptions{
  to: string
  subject: string
  text:string
}
const isProduction:boolean = process.env.NODE_ENV === 'production';
const from = isProduction
  ? 'olhalazyniuk@gmail.com' 
  : 'no-reply@testapp.local'; 

export const sendEmail = async ({ to, subject, text }: IEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: isProduction
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined, 
    
  });

  await transporter.sendMail({
    from ,
    to,
    subject,
    text,
  });
};

