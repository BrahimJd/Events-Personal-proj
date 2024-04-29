const authorizationPage = (req, res, next) => {
  const { role } = req.user;
  if (role === "Manager") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

const authsponsorreq = (req, res, next) => {
  const { role } = req.user;
  if (role === "Sponsor") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = { authorizationPage, authsponsorreq };
