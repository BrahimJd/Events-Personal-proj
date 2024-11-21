const Joi = require("joi");

const authSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("Manager", "Member", "Sponsor"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const eventValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().iso().required(),
  time: Joi.string().required(),
  location: Joi.string().required(),
  category: Joi.string().valid(
    "Music",
    "Technology",
    "Sports",
    "Art",
    "Business",
    "Science",
    "Other"
  ),
  image: Joi.string().uri().required(),
});

module.exports = { authSchema, loginSchema, eventValidationSchema };
