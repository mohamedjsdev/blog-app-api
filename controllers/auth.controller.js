const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
const registerUser = asyncHandler(async (req, res) => {
  // 1-validate
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2-check if user exists
  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // 3-hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // 4-create user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  // 5- generate token
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY
  );
  // 6-send response
  res.status(201).json({ message: "User created successfully", user, token });
});

/**-----------------------------------------------
 * @desc    Login  User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
const loginUser = asyncHandler(async (req, res) => {
  // 1-validate
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2- check user registration
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  // 3- check user password
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if (!matchPassword) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  // 4- generate token
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY
  );
  // 5- send response
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
  });
});

module.exports = {
  registerUser,
  loginUser,
};
