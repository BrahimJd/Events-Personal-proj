const { authSchema, loginSchema } = require("../Helpers/validation");
const {
  signAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
} = require("../Helpers/JwtHelper");
const User = require("../Modules/User");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

// Register a new user
const register = async (req, res) => {
  try {
    console.log("registering user...,", req.body);
    const validatedData = await authSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const user = new User({ ...validatedData, password: hashedPassword });
    const result = await user.save();

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await SignRefreshToken(user.id);
    console.log("User registered successfully:", result);
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
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
    const validatedData = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(validatedData.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accesstoken = await signAccessToken(user.id);
    const refreshToken = await SignRefreshToken(user.id);
    res.status(200).json({ accesstoken, refreshToken });
  } catch (error) {
    console.error(error);
    if (error.isJoi === true) {
      return res.status(400).json({ error: error.details[0].message });
    }
    res.status(500).json({ error: error.message });
  }
};
// Refresh token
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError.BadRequest("Refresh token is required");
    }
    const { userId } = await VerifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const newrefToken = await SignRefreshToken(userId);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: newrefToken });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(error);
  }
};

module.exports = { register, login, refreshToken };
