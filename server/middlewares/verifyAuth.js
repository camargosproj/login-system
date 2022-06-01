const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/envConfig");

const verifyAuth = (req, res, next) => {
    console.log(req.body);
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "Invalid Token",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: "No token provided",
      });
    }
};

module.exports = {verifyAuth};