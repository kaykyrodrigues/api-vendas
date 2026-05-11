import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

class EmailService {
  async sendVerificationEmail(email, token) {
    try {
      const link =
        `http://localhost:3036/auth/verify?token=${token}`;

      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verifique sua conta",
        html: `
          <h2>Verificação de Email</h2>
          <p>Clique no link abaixo:</p>
          <a href="${link}">${link}</a>
        `,
      });

      console.log("EMAIL ENVIADO:");
      console.log(info.response);

    } catch (err) {
      console.error("ERRO AO ENVIAR EMAIL:");
      console.error(err);
    }
  }
}

export default new EmailService();