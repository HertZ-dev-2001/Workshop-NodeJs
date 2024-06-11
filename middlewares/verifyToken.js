const {
  verifyAccessToken,
} = require("../services/authentication/tokenGenerate");

const validateToken = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");
    const verifiedAccessToken = verifyAccessToken(token);
    if (!verifiedAccessToken) {
      return res
        .status(403)
        .json({ message: "Invalid access token or token expired." });
    }
    req.auth = verifiedAccessToken;
    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: 401, message: error });
    return next(error);
  }
};

module.exports = { validateToken };
