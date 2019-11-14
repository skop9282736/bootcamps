const Bootcamp = require('./../models/Bootcamp');
const asyncHandler = require('./../middleware/asyncHandler.middleware');
const geocoder = require('./../utils/geocoder');
const path = require('path');

// @desc Get bootcamps with or withoput filtering
// @route GET api/v1/bootcamps
// @route GET api/v1/bootcamps?careers[in]=business&location.city=boston&averageCost[lte]=100
module.exports.findAllBootcamps = async (req, res) => {
  return res.status(201).json(res.advancedResault);
};

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

// Delete bootcamp
module.exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return res.status(400).send({
      success: false
    });
  }
  bootcamp.remove();
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

//  @desc  upload photo
//  @route  PUT api/v1/bootcamps/:id/photo
//  @access private
module.exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return res.status(400).send({
      success: false
    });
  }

  if (!req.files) {
    return res.status(400).send({
      success: false,
      msg: 'please upload photo'
    });
  }

  const file = req.files.file;

  // validate if the fuile is photo
  if (!file.mimetype.startsWith('image')) {
    return res.status(400).send({
      success: false,
      msg: 'please upload an image file'
    });
  }

  // check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).send({
      success: false,
      msg: `please upload an image < ${process.env.MAX_FILE_UPLOAD}`
    });
  }

  // Create custom fileName
  // we use path library here to get file extension
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  console.log(`${file.name}`);

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      return res.status(500).send({
        success: false,
        msg: `error with file upload`
      });
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: file.name
    });
  });

  return res.status(200).send({
    success: true,
    msg: file.name
  });
});
