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

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId }).populate({
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
  });
});

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate('bootcamp');

  if (!course) {
    return new ErrorResponse('No Course with this if', 404);
  }

  res.status(200).send({
    success: true,
    data: course
  });
};

// @desc      Add single course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    private
exports.addCourse = async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return new ErrorResponse(
      `No bootcamp with id {req.params.bootcampId}`,
      404
    );
  }

  const course = await Course.create(req.body);

  return res.status(200).send({
    success: true,
    data: course
  });
};

// @desc      Update single course
// @route     POST /api/v1/courses/:id
// @access    private
exports.updateCourse = async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if(!course) {
    return next(
      new ErrorResponse(`There is no course with the ID: ${req.params.id}`, 404)
    );
  }

  course = await course.updateOne(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  return res.status(200).send({
    success: true,
    data: course
  });
};
