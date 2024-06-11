const HttpError = require("../utils/HttpError");
const User = require("../models/user");

const isAdminMiddleware = async (req, res, next) => {
  const adminUser = await User.findById(req.userId);

  if (!adminUser) {
    return next(new HttpError(401, "관리자가 아닙니다."));
  }

  if (adminUser.name !== process.env.ADMIN_ID) {
    return next(new HttpError(401, "관리자가 아닙니다."));
  }

  req.isAdmin = true;
  return next();
};

module.exports = isAdminMiddleware;
