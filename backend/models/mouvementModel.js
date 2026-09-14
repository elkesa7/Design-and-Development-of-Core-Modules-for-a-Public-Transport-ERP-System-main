const mongoose = require("mongoose");
const validator = require("validator");

const mouvementSchema = new mongoose.Schema({
  route_affecte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true, /// ne9ess el dropdown yetna7 / yo93ed for editing
  },
  bus_affecte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "Cancelled"],
    default: "Active",
  },
  chauffeur_affecte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personnel",
    required: true,
    validate: {
      validator: async function (personnelId) {
        const personnel = await mongoose
          .model("Personnel")
          .findById(personnelId);
        return personnel && personnel.role === "chauffeur";
      },
      message: "Le personnel affecté doit être un chauffeur.",
    },
  },
  convoyeur_affecte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personnel",
    required: true,
    validate: {
      validator: async function (personnelId) {
        const personnel = await mongoose
          .model("Personnel")
          .findById(personnelId);
        return (
          personnel &&
          (personnel.role === "chauffeur" || personnel.role === "convoyeur")
        );
      },
      message: "Le personnel affecté doit être un convoyeur ou un chauffeur.",
    },
  },
});

mouvementSchema.index(
  { chauffeur_affecte: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "Active" },
  },
);

mouvementSchema.index(
  { convoyeur_affecte: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "Active" },
  },
);

mouvementSchema.index(
  { bus_affecte: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "Active" },
  },
);

const Mouvement = mongoose.model("Mouvement", mouvementSchema);

module.exports = Mouvement;
