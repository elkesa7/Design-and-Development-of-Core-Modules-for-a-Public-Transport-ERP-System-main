require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const busRoutes = require("./routes/busRoutes");
const personnelRoutes = require("./routes/personnelRoutes");
const routeRoutes = require("./routes/routeRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const mouvementRoutes = require("./routes/mouvementRoutes");
const authRoutes = require("./routes/authRoutes");
const Mouvement = require("./models/mouvementModel");

const requireRole = require("./middlewares/authorize");
const { protectorMW } = require("./middlewares/authGuardMW");

const app = express();
dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(async () => {
    console.log("The db is connected");
    await Mouvement.syncIndexes();
  })
  .catch((err) => {
    console.log("error :" + err);
  });
app.use(express.json());
app.use(cors());

const port = 1234;

app.use("/auth", authRoutes);

app.use("/bus", protectorMW, requireRole("PDG"), busRoutes); // requireRole("PDG") : authorize
app.use("/personnel", protectorMW, requireRole("PDG"), personnelRoutes);
app.use("/route", protectorMW, requireRole("PDG"), routeRoutes);
app.use("/mouvement", protectorMW, requireRole("PDG"), mouvementRoutes);
app.use("/ticket", protectorMW, requireRole("PDG"), ticketRoutes);

app.listen(port, () => {
  console.log("the server is running on port " + port);
});
