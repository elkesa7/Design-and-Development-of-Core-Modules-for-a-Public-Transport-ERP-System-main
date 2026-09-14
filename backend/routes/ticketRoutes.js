const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
} = require("../controllers/ticketController");

const router = require("express").Router();

router.route("/").post(createTicket).get(getAllTickets);

router
  .route("/:_id")
  .get(getTicketById)
  .patch(updateTicketById)
  .delete(deleteTicketById);

module.exports = router;
