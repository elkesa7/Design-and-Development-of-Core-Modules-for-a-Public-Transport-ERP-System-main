const {
  createMouvement,
  getAllMouvement,
  getMouvementById,
  updateMouvementById,
  deleteMouvementById,
} = require("../controllers/mouvementController");

const router = require("express").Router();

router.route("/").post(createMouvement).get(getAllMouvement);

router
  .route("/:_id")
  .get(getMouvementById)
  .patch(updateMouvementById)
  .delete(deleteMouvementById);

// router.route("/status/:_id").patch(updateMouvementStatusById);
module.exports = router;
