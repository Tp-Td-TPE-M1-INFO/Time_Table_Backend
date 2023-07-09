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
  const previews = await Planning.find({
    $or: [
      { $and: [{ start: { $lte: req.body.end } }, { end: { $gte: req.body.end } }] },
      { $and: [{ start: { $lte: req.body.start } }, { end: { $gte: req.body.start } }] },
    ],
  });

  if (previews[0]) {
    let err = [];
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
    if(err[0])return res.status(400).json(err);
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
      _id : course._id,
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
    return res.status(500).json(err);
  }
};

//Update courses
const updateCourse = asyncHandler(async (req, res) => {
  const { ue, hall, classe, teacher, description, start, end } = req.body;
  const previews = await Planning.find({
    $and : [
      {
        $or: [
          { $and: [{ start: { $lte: req.body.end } }, { end: { $gte: req.body.end } }] },
          { $and: [{ start: { $lte: req.body.start } }, { end: { $gte: req.body.start } }] },
        ],
      },
      { _id: {$ne: req.params.id} }
    ]
  });
  console.log(previews);
  if (previews[0]) {
    let err = [];
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
    if(err[0])return res.status(400).json(err);
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
    },
    {new: true, upsert: true}
    );
    await Planning.findByIdAndUpdate(req.params.id, {
      ue,
      hall,
      classe,
      teacher,
      description,
      start,
      end,
    },
    {new : true, upsert: true}
    );
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete class
const deleteCourse = (async (req, res) => {
  try{
    await Course.findByIdAndDelete(req.params.id);
    await Planning.findByIdAndDelete(req.params.id);
    res.status(200).json({Message : "Coures deleted"});
  }
  catch(err)
  {
    res.status(400).json(err);
  }
});

module.exports = {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
