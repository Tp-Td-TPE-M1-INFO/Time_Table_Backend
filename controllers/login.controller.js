const Student = require("../models/student.model");
const Admin = require("../models/admin.model");
const Teacher = require("../models/teacher.model");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const { loginValidation } = require("../middlewares/validation");

const login = async (req, res) => {
  const { registerNumber, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // student login
  const student = await Student.findOne({ registerNumber });
  if (student) {
    const validPass = await bcrypt.compare(password, student.password);
    if (!validPass)
      return res.status(400).send("Invalid register number or password");
    //Create and asign a token
    return res.status(200).json({
      _id: student._id,
      name: student.name,
      surname: student.surname,
      registerNumber: student.registerNumber,
      email: student.email,
      avatar: student.avatar,
      role: student.role,
      token: generateToken(student._id),
    });
  }

  //teacher login
  const teacher = await Teacher.findOne({ registerNumber });
  if (teacher) {
    const validPass = await bcrypt.compare(password, teacher.password);
    console.log(teacher);
    if (!validPass)
      return res.status(400).send("Invalid register number or password");
    //Create and asign a token
    const token = generateToken(teacher._id);

    return res.status(200).json({
      _id: teacher._id,
      name: teacher.name,
      surname: teacher.surname,
      registerNumber: teacher.registerNumber,
      email: teacher.email,
      avatar: teacher.avatar,
      role: teacher.role,
      token: token,
    });
  }

  // admin login
  const admin = await Admin.findOne({ registerNumber });
  if (admin) {
    const validPass = await bcrypt.compare(password, admin.password);
    //Create and asign a token
    const token = generateToken(admin._id);

    return res.status(200).json({
      _id: admin._id,
      name: admin.name,
      surname: admin.surname,
      registerNumber: admin.registerNumber,
      email: admin.email,
      avatar: admin.avatar,
      token: token,
    });
  } else {
    return res
      .status(400)
      .json({ message: "invalid register number or password " });
  }
};

module.exports = { login };
