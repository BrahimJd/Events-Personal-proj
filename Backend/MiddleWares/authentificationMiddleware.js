const jwt = require("jsonwebtoken");

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  // Verify token
  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];

    const decoded = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
