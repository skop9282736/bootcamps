module.exports.logger = (req, res, next) => {
  req.hello = 'yo skalippan';
  console.log('middleware ran');
  next();
};
