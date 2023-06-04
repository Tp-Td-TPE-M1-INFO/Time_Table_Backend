const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model")
const Admin = require("../models/admin.model")

const protect = (async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
        try {
            token = req.headers.authorization.split(" ")[1];
        //decodes token id
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            req.student = await Student.findById({_id: decoded._id}).select("-password");

            req.teacher = await Teacher.findById({_id: decoded._id}).select("-password");

            req.admin = await Admin.findById({_id: decoded._id}).select("-password");

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
