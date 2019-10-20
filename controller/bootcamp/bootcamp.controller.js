module.exports.findAllBootcamps = (req, res) => {
  res.status(200).json({ msg: 'create bootcamp', hello: req.hello });
};

module.exports.createBootcamp = (req, res) => {
  res.status(200).json({ msg: 'create bootcamp' });
};

module.exports.updateBootcamp = (req, res) => {
  res.status(200).json({ msg: 'update bootcamp' });
};

module.exports.deleteBootcamp = (req, res) => {
  res.status(200).json({ msg: 'delete bootcamp' });
};

module.exports.findOneBootcamp = (req, res) => {
  res.status(200).json({ msg: 'find one bootcamp' });
};
