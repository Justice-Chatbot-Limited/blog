import Joi from "@hapi/joi";
import Errors from "../../helpers/errors";
/**
 * Contains validations for the user
 *
 * @class User
 */
class UserValidation {
  /**
   * Validates the signup body
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof User
   */
  static signup(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().min(3).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(50).required(),
    });

    const result = Joi.validate(req.body, schema);

    if (!result.error) {
      return next();
    }
    return Errors.joiErrorResponse(res, result.error);
  }

  /**
   * Validates the signin body
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof User
   */
  static signin(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      return next();
    }
    return Errors.joiErrorResponse(res, result.error);
  }
}

export default UserValidation;
