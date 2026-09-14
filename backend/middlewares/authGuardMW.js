const Personnel = require("../models/personnelModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.protectorMW = async (req, res, next) => {
  try {
    let token;
    // 1. Check if user has a token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in!",
      });
    }

    // 2. Verify token
    const isTokenValid = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET,
    );

    // 3. Check if user exists
    const isUserExists = await Personnel.findById(isTokenValid.id);

    if (!isUserExists) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // 4. Check if password was changed after token creation
    if (
      isUserExists.late_pass_change_date &&
      parseInt(isUserExists.late_pass_change_date.getTime() / 1000) >
        isTokenValid.iat
    ) {
      return res.status(401).json({
        message: "Token expired!",
      });
    }

    // 5. Put user in request
    req.personnel = isUserExists;

    // 6. Continue
    next();
  } catch (err) {
    console.log("AUTH ERROR:", err);

    return res.status(401).json({
      message: "Authentication failed",
      error: err.message,
    });
  }
};
