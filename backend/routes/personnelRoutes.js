const {
  createPersonnel,
  getAllPersonnel,
  getPersonnelById,
  updatePersonnelById,
  deletePersonnelById,
} = require("../controllers/personnelController");

const router = require("express").Router();
const checkMouvementUsage = require("../middlewares/checkMouvementUsage");
const checkPDG = require("../middlewares/checkPDG");

router.route("/").post(createPersonnel).get(getAllPersonnel);

router
  .route("/:_id")
  .get(getPersonnelById)
  .patch(updatePersonnelById)
  .delete(
    checkPDG,
    checkMouvementUsage(["chauffeur_affecte", "convoyeur_affecte"]),
    deletePersonnelById,
  );

module.exports = router;
