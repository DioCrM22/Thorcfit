const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports = {
  sendConfirmationEmail: async (user) => {
    const mailOptions = {
      from: `THORC Fit <${process.env.EMAIL_SENDER}>`,
      to: user.email,
      subject: 'Confirme seu cadastro',
      html: `
        <h2>Bem-vindo ao THORC Fit, ${user.nome}!</h2>
        <p>Clique no link abaixo para confirmar seu e-mail:</p>
        <a href="${process.env.FRONTEND_URL}/confirmar-email/${user.confirmacao_token}">
          Confirmar E-mail
        </a>
      `
    };

    await transporter.sendMail(mailOptions);
  },

  sendPasswordResetEmail: async (user) => {
    const mailOptions = {
      from: `THORC Fit <${process.env.EMAIL_SENDER}>`,
      to: user.email,
      subject: 'Redefinição de Senha',
      html: `
        <h2>Redefinição de Senha</h2>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${process.env.FRONTEND_URL}/resetar-senha/${user.reset_token}">
          Redefinir Senha
        </a>
        <p>Este link expira em 1 hora.</p>
      `
    };

    await transporter.sendMail(mailOptions);
  }
};
