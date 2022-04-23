const bcrypt = require('bcrypt');

const hash = (password, salt) => {
  const generateSalt = bcrypt.genSaltSync(salt);
  const generateHash = bcrypt.hashSync(password, generateSalt);

  return generateHash;
};

module.exports = hash;
