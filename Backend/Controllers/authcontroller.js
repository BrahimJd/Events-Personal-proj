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

    const user = new User({
      ...validatedData,
      password: hashedPassword,
      role: validatedData.role || "Member",
    });
    const result = await user.save();

    const accessToken = await signAccessToken(user.id, user.role);
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

const login = async (req, res) => {
  try {
    console.log("Login attempt:", req.body);
    const validatedData = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(validatedData.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = await signAccessToken(user.id, user.role);
    const refreshToken = await SignRefreshToken(user.id);
    console.log("Login successful for:", user.email);
    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
// Refresh token
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError.BadRequest("Refresh token is required");
    }

    const userId = await VerifyRefreshToken(refreshToken);
    console.log("Verified userId:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      throw createError.Unauthorized("User not found");
    }

    const accessToken = await signAccessToken(userId, user.role);
    const newRefToken = await SignRefreshToken(userId);

    res.status(200).json({
      accessToken,
      refreshToken: newRefToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(error);
  }
};

module.exports = { register, login, refreshToken };
