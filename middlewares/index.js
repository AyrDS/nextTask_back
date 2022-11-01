const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const extractToken = require('../helpers/extractJWT.js');
const User = require('../models/user_model.js');

const checkAuth = async (req, res, next) => {
   const token = extractToken(req);

   if (!token) {
      return res.status(401).json({ msg: 'Token no válido' })
   }

   try {
      const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
      req.user = await User.findById(uid).select('-password -confirmed -token -createdAt -updatedAt -__v');

      next();
   } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' });
   }

}


const validateFields = (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         msg: errors.errors[0].msg
      });
   }

   next();
}

module.exports = {
   checkAuth,
   validateFields
}
