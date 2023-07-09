const jwt  = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ _id : id.toString() }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
