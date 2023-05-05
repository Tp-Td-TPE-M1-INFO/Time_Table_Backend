const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher.model");

const protect = (async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
        console.log(token);
      //decodes token id
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(decoded);

      req.teacher = await Teacher.findById({_id: decoded._id, token: token}).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
