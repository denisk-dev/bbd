const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // console.log(req);
    // console.log(req.data);
    // console.log(req.headers);
    const token = req.headers.authorization;
    // console.log(token);
    const decoded = jwt.verify(token, "secretkey");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
