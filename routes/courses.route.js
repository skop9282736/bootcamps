const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse
} = require('./../controller/course.controller');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses);

router.route('/:id').get(getCourse);

router.route('/').post(addCourse);

module.exports = router;
