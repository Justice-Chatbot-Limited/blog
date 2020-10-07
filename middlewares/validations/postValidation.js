import Joi from '@hapi/joi';
import Errors from '../../helpers/errors';
/**
 * Contains validations for the post in our blog
 *
 * @class Post
 */
class PostValidation {
  /**
   * Validates the Post body
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Post
   */
  static validateCreatePost(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().min(2).required(),
      description: Joi.string().min(2).required()
    });

    const result = Joi.validate(req.body, schema);

    if (!result.error) {
      return next();
    }
    return Errors.joiErrorResponse(res, result.error);
  }
}

export default PostValidation;
