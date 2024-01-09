import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 2525,
  host: "smtp.elasticemail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://www.yourforms.online/auth/new-verification?token=${token}`;

  const mailData = {
    from: "YourForms <arodriguezl9302@proton.me>",
    to: email,
    subject: `Confirmación de cuenta`,
    html: `<p>Hola, click <a href="${confirmLink}">aca</a> para activar tu cuenta</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    // else console.log(info);
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `https://www.yourforms.online/auth/new-password?token=${token}`;

  const mailData = {
    from: "YourForms <arodriguezl9302@proton.me>",
    to: email,
    subject: `Cambio de contraseña`,
    html: `<p>Hola, click <a href="${confirmLink}">aca</a> cambiar tu contraseña</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    // else console.log(info);
  });
};
