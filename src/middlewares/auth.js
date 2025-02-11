const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .send("Authentication failed: Token is missing. Please log in again.");
    }

    const DecodeObj = await jwt.verify(token, "vivek@sjbeddhjugd#er");
    const { _id } = DecodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error(
        "User not found: The account associated with this token does not exist."
      );
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
