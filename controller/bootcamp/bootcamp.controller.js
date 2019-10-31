const Bootcamp = require('./../../models/Bootcamp');
const asyncHandler = require('./../../middleware/asyncHandler.middleware');
const geocoder = require('./../../utils/geocoder');

// @desc Get bootcamps with or withoput filtering
// @route GET api/v1/bootcamps
// @route GET api/v1/bootcamps?careers[in]=business&location.city=boston&averageCost[lte]=100
module.exports.findAllBootcamps = asyncHandler(async (req, res) => {
  let query;

  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, math => `$${math}`);
  query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;

  return res.status(201).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
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
  const { zipcode, distance } = req.params;

  // Get lang/lat from Geocoder
  const location = await geocoder.geocode(zipcode);
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
    .status(200)
    .json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
});
