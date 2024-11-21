const authManager = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (req.user.role !== "Manager") {
    return res
      .status(403)
      .json({ message: "This action requires Manager privileges" });
  }

  next();
};

const authSponsor = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (req.user.role !== "Sponsor" && req.user.role !== "Manager") {
    return res.status(403).json({
      message: "This action requires Sponsor or Manager privileges",
    });
  }

  next();
};

module.exports = {
  authManager,
  authSponsor,
};
