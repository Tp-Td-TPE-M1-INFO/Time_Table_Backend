const asyncHandler = require('express-async-handler');
const Course = require('../models/course.model');
const { default: mongoose } = require('mongoose');
const { findOne } = require('../models/ue.model');

//Get all courses
const getCourses = asyncHandler(async (req,res) => {
    let courses = await Course.find()
        .populate('ue')
        .populate('hall')
        .populate('classe')
        .populate('teacher')
        .exec();
    res.status(200).json(courses)
});

//Get one course
const getCourse = asyncHandler(async (req,res) => {
    let course = await Course.findById(req.params.id)
        .populate('ue')
        .populate('hall')
        .populate('classe')
        .populate('teacher')
        .exec();

    if(!course){
        res.status(404);
        throw new Error('Course not found');
    }
    res.status(200).json(course);
});

//Create class
const createCourse = asyncHandler(async (req,res) => {
   //console.log('the request body is :', req.body);
    const {ue, hall, classe, teacher, description, start, end, n} = req.body;
    if(!ue || !hall || !classe || !teacher){
        res.status(400);
        throw new Error('All Fields are mandatory')
    };
    let courses = [];
    for(i ==0; i<n; i++){
        const previews = await Course.find({$and : 
            [
                { end : {$gt : start}}, 
                {start : {$lt : end}} 
            ]
        })
        if(preview)
        {
            previews.forEach(preview => {
                if(preview.hall == hall) 
                {
                    res.status(400).send({message: "salle déjà occupée"});
                    return;
                }
                if(preview.teacher == teacher)
                {
                    res.status(400).send({message: "enseignant déjà occupé"});
                    return;
                }
                if(preview.classe == classe)
                {
                    res.status(400).send({message: "classe déjà occupée"});
                    return;
                }
            });
        }
        const course = await Course.create({
            ue,
            hall,
            classe,
            teacher,
            description,
            start,
            end
        });
        courses.push(course);
        start += 604800000;
        end += 604800000;    
    }
    res.status(201).json(courses)
});

//Update courses
const updateCourse = asyncHandler(async (req,res) => {
    const course = await Course.findById(req.params.id);
    if(!course){
        res.status(404);
        throw new Error('Course not found');
    };
    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedCourse);
});

//delete class
const deleteCourse = asyncHandler(async (req,res) => {
    const course = await Course.findById(req.params.id);
    if(!course){
        res.status(404);
        throw new Error('Course not found');
    };
    await Course.deleteOne();
    res.status(200).json(course)
});

module.exports = {getCourse, getCourses, createCourse, updateCourse, deleteCourse};