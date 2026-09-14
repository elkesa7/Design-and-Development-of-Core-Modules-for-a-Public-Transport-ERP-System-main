const Bus = require("../models/busModel");

exports.createBus = async (req, res) => {
  try {
    const newBus = await Bus.create(req.body);
    res.status(200).json({
      message: "bus created ",
      data: newBus,
    });
  } catch (error) {
    res.status(400).json({
      message: "Check the fields",
      data: error.message,
    });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const allBuses = await Bus.find();

    res.status(200).json({
      message: "Buses fetched !! ",
      data: allBuses,
      nbr: allBuses.length,
    });
  } catch (error) {
    res.status(404).json({
      message: "no buses",
      data: error.message,
    });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params._id);
    if (!bus) {
      res.status(404).json({
        message: "bus not found",
      });
    }
    res.status(200).json({
      message: "Bus : ",
      data: bus,
    });
  } catch (error) {
    res.status(404).json({
      message: "There is a problem when getting the bus",
      data: error.message,
    });
  }
};

exports.updateBusById = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    if (!bus) {
      res.status(404).json({
        message: "Bus not found !!",
      });
    }
    res.status(200).json({
      message: "Bus updated",
      data: bus,
    });
  } catch (err) {
    res.status(400).json({
      message: "There is a problem when updating the bus",
      error: err,
    });
  }
};

exports.deleteBusById = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params._id);

    if (!deletedBus) {
      return res.status(404).json({
        message: "Bus not found",
      });
    }

    res.status(200).json({
      message: "bus deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "There is a problem when deleting the bus ",
      data: error.message,
    });
  }
};
