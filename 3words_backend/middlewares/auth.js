const jwt = require("jsonwebtoken");

const HttpError = require("../utils/HttpError");

const authMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    const authorizationError = new HttpError(401, "권한이 없습니다.");

    const AuthorizationHeader = req.get("Authorization");

    if (!AuthorizationHeader) {
        return next(authorizationError);
    }

    const token = AuthorizationHeader.split(" ")[1];

    if (!token) {
        return next(authorizationError);
    }

    let verified;

    try {
        verified = jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
        console.log(e);
        return next(authorizationError);
    }

    if (verified) {
        req.userId = verified.userId;
        return next();
    }
};

module.exports = authMiddleware;
