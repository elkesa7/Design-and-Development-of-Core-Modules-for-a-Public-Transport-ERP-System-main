const Personnel = require("../models/personnelModel");

exports.createPersonnel = async (req, res) => {
  try {
    const newPersonnel = await Personnel.create(req.body);
    res.status(201).json({
      message: "Personnel created",
      data: newPersonnel,
    });
  } catch (error) {
    res.status(400).json({
      message: "Check the fields",
      data: error.message,
    });
  }
};

exports.getAllPersonnel = async (req, res) => {
  try {
    const AllPersonnel = await Personnel.find();
    res.status(200).json({
      message: "All Personnels",
      data: AllPersonnel,
    });
  } catch (error) {
    res.status(400).json({
      message: "no personnels",
      data: error.message,
    });
  }
};

exports.getPersonnelById = async (req, res) => {
  try {
    const personnel = await Personnel.findById(req.params._id);
    if (!personnel) {
      res.status(404).json({
        message: "Personnel not found",
      });
    }
    res.status(200).json({
      message: "Personnel : ",
      data: personnel,
    });
  } catch (error) {
    res.status(404).json({
      message: "There is a problem when getting the personnel",
      data: error.message,
    });
  }
};

exports.updatePersonnelById = async (req, res) => {
  try {
    const personnel = await Personnel.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      },
    );
    if (!personnel) {
      res.status(404).json({
        message: "Personnel not found !!",
      });
    }
    res.status(200).json({
      message: "Personnel updated",
      data: personnel,
    });
  } catch (err) {
    res.status(400).json({
      message: "There is a problem when updating the personnel",
      error: err,
    });
  }
};

exports.deletePersonnelById = async (req, res) => {
  try {
    const deletedPersonnel = await Personnel.findByIdAndDelete(req.params._id);

    if (!deletedPersonnel) {
      return res.status(404).json({
        message: "Personnel not found",
      });
    }
    res.status(200).json({
      message: "Personnel deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "There is a problem when deleting the personnel",
      data: error.message,
    });
  }
};
