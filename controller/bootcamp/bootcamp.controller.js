const Bootcamp = require('./../../models/Bootcamp');

module.exports.findAllBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();
    return res.status(201).json({
      success: true,
      data: bootcamps,
      count: bootcamps.length
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: error.errmsg
    });
  }
};

module.exports.createBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    return res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: error.errmsg
    });
  }
};

module.exports.updateBootcamp = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).send({
      success: false
    });
  }
};

module.exports.deleteBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).send({
        success: false
      });
    }
    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(400).send({
      success: false
    });
  }
};

module.exports.findOneBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).send({
        success: false
      });
    }
    return res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    return res.status(400).send({
      success: false
    });
  }
};
