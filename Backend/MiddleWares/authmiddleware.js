const jwt = require("jsonwebtoken");
const User = require("../Modules/User");

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  // Verify token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
