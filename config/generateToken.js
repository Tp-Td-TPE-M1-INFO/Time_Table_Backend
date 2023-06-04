const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: 30*24*60*60*1000,
  });
};

module.exports = generateToken;
