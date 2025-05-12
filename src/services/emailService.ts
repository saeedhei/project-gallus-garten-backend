import nodemailer from 'nodemailer';

export interface IEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private from: string;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';

    this.from = isProduction ? 'olhalazyniuk@gmail.com' : 'no-reply@testapp.local';

    this.transporter = nodemailer.createTransport({
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
  }

  async sendEmail({ to, subject, text }: IEmailOptions) {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      text,
    });
  }
}
