const Joi = require("joi");

const authSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const EventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  location: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string().required(), 
});
module.exports = { authSchema, loginSchema, EventSchema };
