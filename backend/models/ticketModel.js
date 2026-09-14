const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  bus_affecte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
  chauffeur_affecte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chauffeur",
    required: true,
  },
  route_affecte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
