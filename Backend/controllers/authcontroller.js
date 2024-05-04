const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modules/User").default;
const { authSchema } = require("../Helpers/validation");
const { signAccessToken } = require("../Helpers/accesstokenjwt");

// Register a new user
const register = async (req, res) => {
  try {
    //const { username, email, password } = req.body;
    // Validate user input
    const resultt = await authSchema.validateAsync(req.body);
    // Check if user already exists
    const existingUser = await User.findOne({ email: resultt.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user

    // Create token
    const accessToken = await signAccessToken(existingUser.id);
    res.json({ accessToken });

    const user = new User(resultt);
    // Save user to database
    const result = await user.save();

    res.status(201).json(result);
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
    const result = await authSchema.validateAsync(req.body);
    // Check if user exists
    const user = await User.findOne({ email: result.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.isValidPassword(password);
    // Check if password is correct
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.header("auth-token", token).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
