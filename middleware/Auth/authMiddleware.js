const jwt = require("jsonwebtoken");
const User = require("../../models/User/User");

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("please login");
    }
    const decodedObj = jwt.verify(token, process.env.jwt_secret);
    if (!decodedObj) {
      throw new Error("token is invalid");
    }

    const { id } = decodedObj;
    if (!id) {
      throw new Error("user not found");
    }

    const user = await User.findById(id);

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = authMiddleware;
