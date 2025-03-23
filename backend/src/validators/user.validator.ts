import Joi from "joi";

import { regexConstant } from "../constans/regex.constans";

export class UserValidator {
  private static username = Joi.string().regex(regexConstant.USERNAME).trim();
  private static email = Joi.string().regex(regexConstant.EMAIL).email().trim();
  private static password = Joi.string().regex(regexConstant.PASSWORD).trim();

  public static create = Joi.object({
    username: this.username.required().messages({
      "string.base": "Username must be a string",
      "string.empty": "Username cannot be empty",
      "any.required": "Username is a required field",
    }),
    email: this.email.required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required pattern",
      "string.required": "Email is a required field",
    }),
    password: this.password.required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base": "Password does not match the required pattern",
      "string.required": "Password is a required field",
    }),
  });
  public static login = Joi.object({
    email: this.email.required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required pattern",
      "string.required": "Email is a required field",
    }),
    password: this.password.required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base": "Password does not match the required pattern",
      "string.required": "Password is a required field",
    }),
  });
}
