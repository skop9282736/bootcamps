const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middleware/asyncHandler.middleware');
const Course = require('./../models/Course');
const Bootcamp = require('./../models/Bootcamp');

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;
    
    if(req.params.bootcampId) {
      query = Course.find({bootcamp: req.params.bootcampId}).populate({
        path: 'bootcamp',
        select: 'name description'
      });
    } else {
      query = Course.find().populate('bootcamp');
    }

    const courses = await query;
    res.status(200).send({
      success: true,
      count: courses.length,
      data: courses
    })
});
