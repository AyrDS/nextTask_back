const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

   return new Promise((resolve, reject) => {
      const payload = { uid };

      jwt.sign(payload, process.env.SECRET_JWT_SEED, {
         algorithm: 'HS512',
         expiresIn: '24h'
      }, (err, token) => {
         if (err) {
            console.log(err);
            reject('No se pudo generar JWT')
         } else {
            resolve(token)
         }
      });

   });

}

module.exports = generateJWT;
