import Joi from "joi";

export const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const otpCodeSchema = Joi.object({
  otpCode: Joi.string().required(),
  hash: Joi.string().required(),
});

export const validateLoginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

export const validateForgotPassword = Joi.object({
  email: Joi.string().required(),
});

export const validateResetForgotPassword = Joi.object({
  code: Joi.string().required(),
  hash: Joi.string().required(),
  password: Joi.string().required(),
});