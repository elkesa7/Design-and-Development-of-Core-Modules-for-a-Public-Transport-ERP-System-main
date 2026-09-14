const {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRouteById,
  deleteRouteById,
} = require("../controllers/routeController");

const router = require("express").Router();
const checkMouvementUsage = require("../middlewares/checkMouvementUsage");

router.route("/").post(createRoute).get(getAllRoutes);

router
  .route("/:_id")
  .get(getRouteById)
  .patch(updateRouteById)
  .delete(checkMouvementUsage("route_affecte"), deleteRouteById);

module.exports = router;
