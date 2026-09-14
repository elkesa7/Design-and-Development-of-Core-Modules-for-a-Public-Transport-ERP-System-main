const {
  createBus,
  getAllBuses,
  getBusById,
  updateBusById,
  deleteBusById,
} = require("../controllers/busController");

const router = require("express").Router();
const checkMouvementUsage = require("../middlewares/checkMouvementUsage");

router.route("/").post(createBus).get(getAllBuses);

router
  .route("/:_id")
  .get(getBusById)
  .patch(updateBusById)
  .delete(checkMouvementUsage("bus_affecte"), deleteBusById);

module.exports = router;
