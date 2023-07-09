const asyncHandler = require("express-async-handler");
const Course = require("../models/course.model");
const Planning = require("../models/planning.model");

//Get all courses
const getCourses = asyncHandler(async (req, res) => {
  let courses = await Course.find()
    .populate("ue")
    .populate("hall")
    .populate("classe")
    .populate("teacher")
    .exec();
  res.status(200).json(courses);
});

//Get one course
const getCourse = asyncHandler(async (req, res) => {
  let course = await Course.findById(req.params.id)
    .populate("ue")
    .populate("hall")
    .populate("classe")
    .populate("teacher")
    .exec();

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }
  res.status(200).json(course);
});

//Create class
const createCourse = async (req, res) => {
  const { ue, hall, classe, teacher, description, start, end } = req.body;
  const previews = await Course.find({
    $or: [
      { $and: [{ start: { $lte: req.body.end } }, { end: { $gte: req.body.end } }] },
      { $and: [{ start: { $lte: req.body.start } }, { end: { $gte: req.body.start } }] },
    ],
  });

  let err = [];
  if (previews) {
    previews.forEach((preview) => {
      if (preview.hall == hall) {
        err.push({ salle: "salle déjà occupée" });
      }
      if (preview.teacher == teacher) {
        err.push({ enseignant: "enseignant déjà occupé" });
      }
      if (preview.classe == classe) {
        err.push({ classe: "classe déjà occupée" });
      }
    });
    return res.status(400).json(err);
  }
  try {
    const course = await Course.create({
      ue,
      hall,
      classe,
      teacher,
      description,
      start,
      end,
    });
    await Planning.create({
      ue,
      hall,
      classe,
      teacher,
      description,
      start,
      end,
    });
    res.status.json(course);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//Update courses
const updateCourse = asyncHandler(async (req, res) => {
  const { ue, hall, classe, teacher, description, start, end } = req.body;
  if (!ue || !hall || !classe || !teacher || !start || !end) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const previews = await Course.find(
    $or[
      ({ $and: [{ start: { $lt: end } }, { end: { $gt: end } }] },
      { $and: [{ start: { $lt: start } }, { end: { $gt: start } }] })
    ]
  );
  if (previews) {
    previews.forEach((preview) => {
      if (preview.hall == hall) {
        res.status(400).send({ message: "salle déjà occupée" });
        return;
      }
      if (preview.teacher == teacher) {
        res.status(400).send({ message: "enseignant déjà occupé" });
        return;
      }
      if (preview.classe == classe) {
        res.status(400).send({ message: "classe déjà occupée" });
        return;
      }
    });
  }
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, {
      ue,
      hall,
      classe,
      teacher,
      description,
      start,
      end,
    });
    await Planning.findByIdAndUpdate(req.params.id, {
      ue,
      hall,
      classe,
      teacher,
      description,
      start,
      end,
    });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete class
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }
  await Course.deleteOne();
  res.status(200).json(course);
});

module.exports = {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
