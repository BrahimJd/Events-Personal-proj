const Joi = require("joi");

const authSchema = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});
const PermsSchema = Joi.object({
  name: Joi.string().required(),
  PermissionStatus: Joi.object({
    permission_name: Joi.string().required(),
    permission_value: Joi.array().items(Joi.number().min(0).max(3)),
  }),
});

module.exports = { authSchema, PermsSchema };
