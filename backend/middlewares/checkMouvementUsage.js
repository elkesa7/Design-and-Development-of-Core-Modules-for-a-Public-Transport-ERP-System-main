const Mouvement = require("../models/mouvementModel");

const checkMouvementUsage = (fields) => {
  return async (req, res, next) => {
    try {
      const id = req.params._id;

      const fieldsArray = Array.isArray(fields) ? fields : [fields];

      const isUsed = await Mouvement.exists({
        $or: fieldsArray.map((field) => ({
          [field]: id,
        })),
      });

      if (isUsed) {
        return res.status(403).json({
          message:
            "This field cannot be deleted because they are used in a mouvement.",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = checkMouvementUsage;
