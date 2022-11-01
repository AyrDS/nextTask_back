const { emailRegister, emailResetPassword } = require('../helpers/email.js');
const generateId = require('../helpers/generateId.js');
const generateJWT = require('../helpers/generateJWT.js');
const User = require('../models/user_model.js');

const createUser = async (req, res) => {

   const { email } = req.body;

   try {
      const emailExist = await User.findOne({ email });

      if (emailExist) {
         return res.status(400).json({
            msg: 'El email ya se encuentra registrado'
         });
      }

      const user = new User(req.body);
      user.token = generateId();
      await user.save();

      emailRegister({
         email: user.email,
         name: user.name,
         token: user.token
      });

      res.status(201).json({
         msg: 'Revisa tu email para confirmar tu cuenta'
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado del servidor'
      })
   }
}

const login = async (req, res) => {

   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ msg: 'Email o contraseña incorrectas' });
      }

      if (!user.confirmed) {
         return res.status(401).json({ msg: 'Debes confirmar tu cuenta' });
      }

      if (!await user.checkPassword(password)) {
         return res.status(404).json({ msg: 'Email o contraseña incorrectas' });
      }

      user.token = await generateJWT(user.id);
      res.json(user);

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      })
   }
}

const confirmToken = async (req, res) => {
   const { token } = req.params;

   try {
      const user = await User.findOne({ token });

      if (!user) {
         return res.status(404).json({ msg: 'Token no válido' });
      }

      user.confirmed = true;
      user.token = '';
      await user.save();

      res.json({ msg: 'Usuario confirmado' });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      })
   }
}

const resetPassword = async (req, res) => {
   const { email } = req.body;

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(404).json({ msg: 'El usuario no existe' });
      }

      user.token = generateId();
      await user.save();

      emailResetPassword({
         email: user.email,
         name: user.name,
         token: user.token
      })

      res.json({ msg: 'Hemos enviado un email con las instrucciones' })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const checkToken = async (req, res) => {
   const { token } = req.params;

   try {
      const user = await User.findOne({ token });

      if (!user) {
         return res.status(404).json({ msg: 'Token no válido' });
      }

      res.json({ msg: 'Token válido' })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const newPassword = async (req, res) => {
   const { token } = req.params;
   const { password } = req.body;

   try {
      const user = await User.findOne({ token });

      user.password = password;
      user.token = '';
      await user.save();

      res.json({ msg: 'Contraseña actualizada' });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const getProfile = async (req, res) => {
   const { user } = req;

   res.json(user)
}


module.exports = {
   checkToken,
   confirmToken,
   createUser,
   getProfile,
   login,
   newPassword,
   resetPassword,
}
