const Personnel = require("../models/personnelModel");
const jwt = require("jsonwebtoken");

const createToken = (id, prenom) => {
  return jwt.sign({ id, prenom }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// exports.signUp = async (req, res) => {
//   try {
//     const newUser = await Personnel.create({
//       ...req.body,
//       role: req.body.role === "PDG" ? "user" : req.body.role,
//     });
//     res.status(201).json({
//       message: "user created",
//       data: newUser,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: "failed",
//       error: err,
//     });
//   }
// };

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or pass are required !!!",
      });
    }
    const personnel = await Personnel.findOne({ email });
    if (!personnel) {
      return res.status(400).json({
        message: "Email or pass are incorrect !!!",
      });
    }
    if (!(await personnel.checkPass(password, personnel.password))) {
      return res.status(400).json({
        message: "Email or pass are incorrect !!!",
      });
    }
    const token = createToken(personnel._id, personnel.prenom);
    return res.status(200).json({
      message: "Logged In !!!! ",
      data: { personnel, token },
    });
  } catch (err) {
    return res.status(400).json({
      message: "failed",
      error: err,
    });
  }
};
