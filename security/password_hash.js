const bcrypt = require('bcrypt');
const crypto = require('crypto');

const hashPassword = async (password, salt) => {
  // const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

  const hash = (value) =>{
  const algorithm = 'sha512';
   const secret = "mysecretkey";
   return crypto.createHmac(algorithm, secret).update(value).digest (' hex');

};







module.exports = {
  hashPassword,
  hash
};
