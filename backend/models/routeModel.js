const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  id_interne: {
    type: String,
    required: [true, "The id interne is required !!!"],
  },
  nb_stations: {
    type: Number,
    required: [true, "number stations is required !!!"],
  },
  nature_route: {
    type: String,
    required: [true, "nature route is required !!!"],
  },
  centre: {
    type: String,
    required: [true, "centre is required !!!"],
  },
  point_depart: {
    type: String,
    required: [true, "point depart is required !!!"],
  },
  destination: {
    type: String,
    required: [true, "destination is required !!!"],
  },
  distance: {
    type: Number,
    required: [true, "distance is required !!!"],
  },
  heures_depart: {
    type: String,
    required: [true, "distance is required !!!"],
    match: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
  },
  heures_arrivee: {
    type: String,
    required: [true, "distance is required !!!"],
    match: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
  },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
