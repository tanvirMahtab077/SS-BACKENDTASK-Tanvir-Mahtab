const jwt = require("jsonwebtoken");

exports.adminAuth = (permissions) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.Jwt_SECRET_Key, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          if (permissions.includes(decodedToken.role)) {
            next();
          } else {
            return res.status(401).json({ message: "Not authorized" });
          }
        }
      });
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
  };
};

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.Jwt_SECRET_Key, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
