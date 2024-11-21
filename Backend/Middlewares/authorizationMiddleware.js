// Add to authorizationMiddleware.js
const authManager = (req, res, next) => {
  console.log("Auth check:", {
    hasUser: !!req.user,
    userRole: req.user?.role,
    expectedRole: "Manager",
  });

  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (req.user.role !== "Manager") {
    console.log("Role mismatch:", req.user.role);
    return res
      .status(403)
      .json({ message: "This action requires Manager privileges" });
  }

  next();
};

const authSponsor = (req, res, next) => {
  console.log("Auth check:", {
    hasUser: !!req.user,
    userRole: req.user?.role,
    expectedRole: "Sponsor",
  });

  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (req.user.role !== "Sponsor" && req.user.role !== "Manager") {
    console.log("Role mismatch:", req.user.role);
    return res
      .status(403)
      .json({ message: "This action requires Sponsor privileges" });
  }

  next();
};

module.exports = {
  authManager,
  authSponsor,
};
