// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.EMAIL_API_KEY;

const emailRegister = async ({ email, name, token }) => {
   sgMail.setApiKey(apiKey);

   const msg = {
      to: email,
      from: 'ayrtonds97@gmail.com',
      subject: 'NextTask - Confirma tu cuenta',
      text: "Confirma tu cuenta en UpTask",
      html: `<p>¡Hola ${name}! Confirma tu cuenta en UpTask</p>
      <p>Tu cuenta ya esta casi lista, solo debes clickear en el siguiente enlace:</p>
      <a href="${process.env.URL_FRONTEND}/confirmar/${token}">Confirmar cuenta</a>
      
      <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
   }

   sgMail.send(msg)
      .then(() => {
         console.log('Email enviado');
      })
      .catch(e => console.log(e));

   /* const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
      }
   });

   const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Confirma tu cuenta",
      text: "Confirma tu cuenta en UpTask",
      html: `<p>¡Hola ${name}! Confirma tu cuenta en UpTask</p>
      <p>Tu cuenta ya esta casi lista, solo debes clickear en el siguiente enlace:</p>
      <a href="${process.env.URL_FRONTEND}/confirmar/${token}">Confirmar cuenta</a>
      
      <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
   }); */


}

const emailResetPassword = async ({ email, name, token }) => {
   const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
      }
   });

   const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Cambio de contraseña",
      text: "Cambio de contraseña",
      html: `<p style="color: #FF0000" >¡Hola ${name}! Sigue las instrucciones para cambiar tu contraseña</p>
      <p>Solo debes clickear en el siguiente enlace:</p>

      <a href="${process.env.URL_FRONTEND}/olvide-pass/${token}">Cambiar contraseña</a>
      
      <p>Si no solicitaste este email, puedes ignorar este mensaje</p>
      `
   });
}

module.exports = {
   emailRegister,
   emailResetPassword
}
