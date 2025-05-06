import nodemailer from 'nodemailer';
export interface IEmailOptions{
  to: string
  subject: string
  text:string
}
// const transporter = nodemailer.createTransport({
//   port: 1025,
//   secure: false,
// });
// export const sendTestMail = async () => {
//   await transporter.sendMail({
//     from: '"Test App" <no-reply@testapp.com>',
//     to: 'someone@example.com',
//     subject: 'check pst',
//     text: 'If you see text in MailDev — all is good!',
//   });
// };
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

