const Bootcamp = require('./../../models/Bootcamp');
const asyncHandler = require('./../../middleware/asyncHandler.middleware');
const geocoder = require('./../../utils/geocoder');

module.exports.findAllBootcamps = asyncHandler(async (req, res) => {
  const bootcamps = await Bootcamp.find();
  return res.status(201).json({
    success: true,
    data: bootcamps,
    count: bootcamps.length
  });
});

module.exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  return res.status(201).json({
    success: true,
    data: bootcamp
  });
});

module.exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return res.status(400).send({
      success: false
    });
  }
  return res.status(201).json({
    success: true,
    data: bootcamp
  });
});

module.exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(400).send({
      success: false
    });
  }
  return res.status(201).json({ success: true });
});

module.exports.findOneBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    next(err);
  }
  return res.status(201).json({
    success: true,
    data: bootcamp
  });
});

// @desc Get bootcamps within a radius
// @route GET api/v1/bootcamps/radius/:zipcode/:distance
module.exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipCode, distance } = req.params;

  // Get lang/lat from Geocoder
  const location = await geocoder.geocode(zipCode);
  const lat = location[0].latitude;
  const long = location[0].longitude;

  // calc radius
  // earth radius 3,963 mi // 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[long, lat], radius] }
    }
  });

  res
    .status(200)
    .json(200)
    .send({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
});
