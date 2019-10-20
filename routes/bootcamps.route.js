const express = require('express');
const router = express.Router();
const {
  findAllBootcamps,
  createBootcamp,
  updateBootcamp,
  findOneBootcamp,
  deleteBootcamp
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

module.exports = router;
