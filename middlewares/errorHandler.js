function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  switch (err.name) {
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "Forbidden":
      status = 403;
      message = "You're not authorized";
      break;
    case "Unauthorized":
      status = 401;
      message = "Invalid email / password";
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;
    case "BadRequest":
    case "Unauthorized":
      status = 400;
      message = "Email and Password is invalid";
  }
  res.status(status).json({ message: message });
}

module.exports = errorHandler;
