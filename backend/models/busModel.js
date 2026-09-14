const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  matricule: {
    type: String,
    required: [true, "The matricule is required !!!"],
  },
  id_interne: {
    type: String,
    required: [true, "The id interne is required !!!"],
  },
  bus_societe: {
    type: String,
    required: [true, "The bus societe is required !!!"],
  },
  bus_marque: {
    type: String,
    required: [true, "the bus marque is required !!!"],
  },
  bus_type: {
    type: String,
    required: [true, "bus type is required !!!"],
  },
  situation_actuelle: {
    type: String,
    required: [true, "the Situation actuelle is required !!!"],
  },
  kilometrage: {
    type: Number,
    required: [true, "The kilometrage is required !!!"],
  },
  capacite_bus: {
    type: Number,
    required: [true, "The capacite bus is required !!!"],
  },
  nb_places_debout: {
    type: Number,
    required: [true, "Nombre de places debout is required !!!"],
  },
  nb_places_assises: {
    type: Number,
    required: [true, "Nombre de places assises is required !!!"],
  },
  date_fin_visite: {
    type: Date,
    required: [true, "The date Fin Visite is required !!!"],
  },
  date_fin_assurance: {
    type: Date,
    required: [true, "The date Fin Assurance is required !!!"],
  },
  rappels_entretien: {
    type: String,
    required: [true, "The rappels entretien is required !!!"],
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
