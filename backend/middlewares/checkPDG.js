const Personnel = require("../models/personnelModel");

const checkPDG = async (req, res, next) => {
  try {
    const personnel = await Personnel.findById(req.params._id);

    if (!personnel) {
      return res.status(404).json({
        message: "Personnel not found",
      });
    }

    if (personnel.role === "PDG") {
      return res.status(403).json({
        message: "A PDG cannot be deleted",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkPDG;
