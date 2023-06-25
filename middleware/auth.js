const jwt = require("jsonwebtoken");

exports.adminAuth = (permissions) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
          if (err) {
            return res.status(401).json({ message: "Not authorized" });
          } else {
            if (permissions.includes(decodedToken.role)) {
              next();
            } else {
              return res.status(401).json({ message: "Not authorized" });
            }
          }
        }
      );
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
  };
};

exports.userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
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
