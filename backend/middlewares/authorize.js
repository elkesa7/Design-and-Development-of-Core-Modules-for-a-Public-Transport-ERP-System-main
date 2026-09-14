const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.personnel) {
      return res.status(401).json({
        message: "Utilisateur non authentifié",
      });
    }
    if (!roles.includes(req.personnel.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = requireRole;
