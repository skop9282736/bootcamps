const express = require('express');
const router = express.Router();
const {
  findAllBootcamps,
  createBootcamp,
  updateBootcamp,
  findOneBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controller/bootcamp/bootcamp.controller');

router
  .route('/')
  .get(findAllBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(findOneBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
