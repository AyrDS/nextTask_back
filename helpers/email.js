// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.EMAIL_API_KEY;

const emailRegister = async ({ email, name, token }) => {
   sgMail.setApiKey(apiKey);
   const msg = {
      to: email,
      from: 'ayrtonds97@gmail.com',
      subject: 'NexTask - Confirma tu cuenta',
      text: "Confirma tu cuenta en UpTask",
      html: `
      <div>
         <p style="font-weight: bold; margin: 0; color: #0284c7;">¡Hola ${name}! Confirma tu cuenta en NexTask</p>
         <p>Tu cuenta ya esta casi lista, solo debes clickear en el siguiente enlace:</p>
         <a style="font-weight: bold; background-color: #0284c7; color: #fff; text-decoration: none; padding: 12px 12px; margin: 0 auto; border-radius: 3px;" href="${process.env.URL_FRONTEND}/confirmar/${token}">Confirmar cuenta</a>

         <p style="font-weight: bold;">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
      </div>
      `,

   }

   sgMail.send(msg)
      .then(() => {
         console.log('Email enviado');
      })
      .catch(e => console.log(e));

}

const emailResetPassword = async ({ email, name, token }) => {
   sgMail.setApiKey(apiKey);
   const msg = {
      from: 'ayrtonds97@gmail.com',
      to: email,
      subject: "NexTask - Cambio de contraseña",
      text: "Cambio de contraseña",
      html: `
      <div>
         <p style="font-weight: bold; margin: 0; color: #0284c7;">¡Hola ${name}! Reestablece tu contraseña</p>
         <p>Para reestablecer tu contraseña, clickea en el proximo enlace:</p>
         <a style="font-weight: bold; background-color: #0284c7; color: #fff; text-decoration: none; padding: 12px 12px; margin: 0 auto; border-radius: 3px;" href="${process.env.URL_FRONTEND}/olvide-pass/${token}">Reestablecer contraseña</a>

         <p style="font-weight: bold;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
      </div>
      `
   }

   sgMail.send(msg)
      .then(() => {
         console.log('Email enviado');
      })
      .catch(e => console.log(e));
}

module.exports = {
   emailRegister,
   emailResetPassword
}
