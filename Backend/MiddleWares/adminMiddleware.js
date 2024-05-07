const onlyAdminAccess = (req, res, next) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({ success: false, message: "You Don't have access " });
  }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
    
  return next();
};

module.exports = onlyAdminAccess;
