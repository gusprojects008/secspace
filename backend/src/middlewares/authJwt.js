const jwt = require('jsonwebtoken');
const {ReasonPhrases, StatusCodes} = require('http-status-codes');

function authJwt(req, res, next) {
  const auth = req.header.authorization;
  const errorResponse = res.status(StatusCodes.UNAUTHORIZED).redirect('/login');
  if (!auth) {
    return errorResponse;
  };
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    errorResponse;
  };
};

module.exports = authJwt;
