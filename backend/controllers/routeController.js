const Route = require("../models/routeModel");

exports.createRoute = async (req, res) => {
  try {
    const newRoute = await Route.create(req.body);
    res.status(201).json({
      message: "route cree",
      data: newRoute,
    });
  } catch (error) {
    res.status(400).json({
      message: "Check the fields",
      data: error.message,
    });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const allRoutes = await Route.find();
    res.status(200).json({
      message: "all routes : ",
      data: allRoutes,
    });
  } catch (error) {
    res.status(404).json({
      message: "no routes",
      data: error.message,
    });
  }
};

exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params._id);
    if (!route) {
      res.status(404).json({
        message: "the route not found",
      });
    }
    res.status(200).json({
      message: "route : ",
      data: route,
    });
  } catch (error) {
    res.status(404).json({
      message: "There is a problem when getting the route",
      data: error.message,
    });
  }
};

exports.updateRouteById = async (req, res) => {
  try {
    const routeToUpdate = await Route.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      },
    );
    if (!routeToUpdate) {
      res.status(404).json({
        message: "the route not found",
      });
    }
    res.status(200).json({
      message: "The route has been updated",
      data: routeToUpdate,
    });
  } catch (error) {
    res.status(400).json({
      message: "There is a problem when updating the route",
      data: error.message,
    });
  }
};

exports.deleteRouteById = async (req, res) => {
  try {
    const routeToDelete = await Route.findByIdAndDelete(req.params._id);
    if (!routeToDelete) {
      res.status(404).json({
        message: "the route not found",
      });
    }
    res.status(200).json({
      message: "The route has been deleted",
      data: routeToDelete,
    });
  } catch (error) {
    res.status(400).json({
      message: "There is a problem when deleting the route",
      data: error.message,
    });
  }
};
