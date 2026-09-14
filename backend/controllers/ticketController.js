const Ticket = require("../models/ticketModel");
exports.createTicket = async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    res.status(201).json({
      message: "Ticket cree",
      data: newTicket,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error.message,
    });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const allTickets = await Ticket.find();
    res.status(200).json({
      message: "all Tickets : ",
      data: allTickets,
    });
  } catch (error) {
    res.status(404).json({
      message: "error",
      data: error.message,
    });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const Ticket = await Ticket.findById(req.params._id);
    if (!Ticket) {
      res.status(404).json({
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      message: "Ticket : ",
      data: Ticket,
    });
  } catch (error) {
    res.status(404).json({
      message: "error",
      data: error.message,
    });
  }
};

exports.updateTicketById = async (req, res) => {
  try {
    const TicketToUpdate = await Ticket.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      },
    );
    if (!TicketToUpdate) {
      res.status(404).json({
        message: "the Ticket not found",
      });
    }
    res.status(200).json({
      message: "The Ticket has been updated",
      data: TicketToUpdate,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error.message,
    });
  }
};

exports.deleteTicketById = async (req, res) => {
  try {
    const TicketToDelete = await Ticket.findByIdAndDelete(req.params._id);
    if (!TicketToDelete) {
      res.status(404).json({
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      message: "Ticket has been deleted",
      data: TicketToDelete,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error.message,
    });
  }
};
