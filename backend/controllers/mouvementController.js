const Mouvement = require("../models/mouvementModel");

exports.createMouvement = async (req, res) => {
  try {
    const newMouvement = await Mouvement.create(req.body);
    res.status(201).json({
      message: "Mouvement created",
      data: newMouvement,
    });
  } catch (error) {
    res.status(400).json({
      message: "Check the fields",
      data: error.message,
    });
  }
};

exports.getAllMouvement = async (req, res) => {
  try {
    const AllMouvement = await Mouvement.find()
      .populate("route_affecte")
      .populate("bus_affecte")
      .populate("chauffeur_affecte")
      .populate("convoyeur_affecte");
    res.status(200).json({
      message: "All the mouvements",
      data: AllMouvement,
    });
  } catch (error) {
    res.status(400).json({
      message: "no Mouvements",
      data: error.message,
    });
  }
};

exports.getMouvementById = async (req, res) => {
  try {
    const mouvement = await Mouvement.findById(req.params._id)
      .populate("route_affecte")
      .populate("bus_affecte")
      .populate("chauffeur_affecte")
      .populate("convoyeur_affecte");
    if (!mouvement) {
      res.status(404).json({
        message: "Mouvement not found",
      });
    }
    res.status(200).json({
      message: "Mouvement : ",
      data: mouvement,
    });
  } catch (error) {
    res.status(404).json({
      message: "There is a problem when getting the mouvement",
      data: error.message,
    });
  }
};

// exports.updateMouvementStatusById = async (req, res) => {
//   try {
//     await Mouvement.findByIdAndUpdate(
//       req.params._id,
//       {
//         status: "Completed",
//       },
//       {
//         new: true,
//       },
//     );
//     if (!Mouvement) {
//       res.status(404).json({
//         message: "Mouvement not found !!",
//       });
//     }
//     res.status(200).json({
//       message: "Mouvement Status updated",
//       data: Mouvement,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: "There is a problem when updating the status of the mouvement",
//       error: err,
//     });
//   }
// };

exports.updateMouvementById = async (req, res) => {
  try {
    const mouvement = await Mouvement.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      },
    );
    if (!mouvement) {
      res.status(404).json({
        message: "Mouvement not found !!",
      });
    }
    res.status(200).json({
      message: "Mouvement updated",
      data: mouvement,
    });
  } catch (err) {
    res.status(400).json({
      message: "There is a problem when updating the mouvement",
      error: err,
    });
  }
};

exports.deleteMouvementById = async (req, res) => {
  try {
    const deletedMouvement = await Mouvement.findByIdAndDelete(req.params._id);

    if (!deletedMouvement) {
      return res.status(404).json({
        message: "Mouvement not found",
      });
    }
    res.status(200).json({
      message: "Mouvement deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "There is a problem when deleting the bus",
      data: error.message,
    });
  }
};
