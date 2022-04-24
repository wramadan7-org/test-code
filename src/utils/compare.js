const bcrypt = require('bcrypt');

const compare = (password, comparePassword) => {
  const comparing = bcrypt.compareSync(password, comparePassword);
  
  if (!comparing) return false;

  return true;
};

module.exports = compare;
