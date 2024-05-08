const authManager = (req, res, next) => {
  const { role } = req.user;
  if (role === "Manager") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

const authSponsor = (req, res, next) => {
  const { role } = req.user;
  if (role === "Sponsor" || role === "Manager") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
module.exports = { authManager, authSponsor };
