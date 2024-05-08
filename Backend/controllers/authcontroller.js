const { authSchema, loginSchema } = require("../Helpers/validation");
const {
  signAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
} = require("../Helpers/JwtHelper");
const User = require("../Modules/User");
const bcrypt = require("bcrypt");

// Register a new user
const register = async (req, res) => {
  try {
    console.log("registering user...,", req.body);
    const resultt = await authSchema.validateAsync(req.body);
    const existingUser = await User.findOne({ email: resultt.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(resultt.password, salt);

    const user = new User({ ...resultt, password: hashedPassword });
    const result = await user.save();

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await SignRefreshToken(user.id);
    console.log("User registered successfully:", result);
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({ error: error.details[0].message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    console.log("logging in user...,", req.body);
    const result = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(result.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accesstoken = await signAccessToken(user.id);
    const refreshToken = await SignRefreshToken(user.id);
    res.status(200).json({ accesstoken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // Refresh token
};
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError.BadRequest();
    }
    await VerifyRefreshToken(refreshToken);
    const { userId } = await VerifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await SignRefreshToken(userId);
    res.status(200).json({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refreshToken };
