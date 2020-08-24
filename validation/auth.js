const Joi = require("joi");

const name = Joi.string()
  .min(3)
  .max(30)
  .required();

const email = Joi.string()
  .email()
  .required();

const password = Joi.string()
  .min(8)
  .required();

const registerSchema = Joi.object({
  name,
  email,
  password
});

const loginSchema = Joi.object({
  email,
  password
});

module.exports = {
  registerValidator(values) {
    return registerSchema.validateAsync(values);
  },

  loginValidator(values) {
    return loginSchema.validateAsync(values);
  }
};
