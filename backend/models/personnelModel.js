const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const personnelSchema = new mongoose.Schema({
  prenom: {
    type: String,
    required: [true, "The prenom is required !!!"],
  },
  nom: {
    type: String,
    required: [true, "The nom is required !!!"],
  },
  email: {
    type: String,
    required: function () {
      return this.role === "PDG";
    },
    lowercase: true,
    validate: [validator.isEmail, "this email is not valid !!"],
  },
  password: {
    type: String,
    required: function () {
      return this.role === "PDG";
    },
    minlength: 8,
  },
  id_interne: {
    type: String,
    required: [true, "The id interne is required !!!"],
  },
  role: {
    type: String,
    enum: ["PDG", "chauffeur", "convoyeur", "contrôleur", "agent"],
    default: "agent",
  },
  date_mise_en_service: {
    type: Date,
    required: [true, "Date Mise en service is required !!!"],
  },
  cin: {
    type: String,
    minlength: 8,
    maxlength: 8,
    required: [true, "Cin is required !!!"],
  },
  societe_affecte: {
    type: String,
    required: [true, "societe affecté is required !!!"],
  },
  numero_telephone: {
    type: String,
    minlength: 8,
    maxlength: 8,
    required: [true, "numero telephone is required !!!"],
  },
  adresse: {
    type: String,
    required: [true, "adresse is required !!!"],
  },
  info_permis: {
    type: String,
    required: function () {
      return this.role === "chauffeur";
    },
  },
  expiration_permis: {
    type: Date,
    required: function () {
      return this.role === "chauffeur";
    },
  },
  horaires_travail: {
    ///
    type: String,
    required: [true, "The horaires travail is required !!!"],
  },
  salaire: {
    type: Number,
    required: [true, "The salaire is required !!!"],
  },
});

personnelSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $exists: true, $type: "string" },
    },
  },
);

personnelSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
  }
  return next;
});

personnelSchema.methods.checkPass = async function (password, hashedPassword) {
  return await bcryptjs.compare(password, hashedPassword);
};

const Personnel = mongoose.model("Personnel", personnelSchema);

module.exports = Personnel;
