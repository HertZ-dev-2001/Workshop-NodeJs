const jwt = require("jsonwebtoken");

const jwtAccessTokenGenerate = (id, email) => {
  const accessToken = jwt.sign(
    { _id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION, algorithm: "HS256" }
  );
  return accessToken;
};

const decodedAccessToken = (accessToken) => {
  const decodedToken = jwt.decode(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { algorithm: ["HS256"] }
  );
  return decodedToken;
};

const verifyAccessToken = (accessToken) => {
  const verifiedAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET_KEY
  );
  return verifiedAccessToken;
};

module.exports = {
  jwtAccessTokenGenerate,
  decodedAccessToken,
  verifyAccessToken,
};
