const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Configuração do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'seu-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'sua-senha',
  },
});

// Middleware para analisar o corpo da solicitação
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para manipular o formulário
app.post('/send-email', (req, res) => {
  const { name, email, subject, body } = req.body;

  // Configurações do email
  const mailOptions = {
    from: process.env.EMAIL_USER || 'seu-email@gmail.com',
    to: 'jarodsystem64@gmail.com',
    subject: subject,
    text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${body}`,
  };

  // Enviar email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email enviado: ' + info.response);
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
