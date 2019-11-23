const express = require("express");
const router = express.Router();
const {
  findAllBootcamps,
  createBootcamp,
  updateBootcamp,
  findOneBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controller/bootcamp.controller");
const courseRouter = require("./courses.route");
const Bootcamp = require("./../models/Bootcamp");
const advancedResult = require("./../middleware/advancedResault");

const { protect } = require("./../middleware/auth.middeware");

// Re-route into other resource routers
router.use("/:bootcampId/courses", protect, courseRouter);

router
  .route("/")
  .get(advancedResult(Bootcamp, "courses"), findAllBootcamps)
  .post(protect, createBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
  .route("/:id")
  .get(findOneBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
