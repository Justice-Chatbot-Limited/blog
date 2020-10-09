/* Handles controller responses
 *
 * @class Errors
 */
class ControllersResponse {
  /**
   *
   *
   * @static
   * @param {*} res
   * @param {*} e
   * @returns {object} success
   * @memberof errors
   */
  static successResponse(res, statusCode, message, data) {
    return res.status(statusCode).json({
      status: statusCode,
      message,
      data
    });
  }

  /**
   *
   *
   * @static
   * @param {*} res
   * @param {*} e
   * @returns {object} error
   * @memberof errors
   */

  static errorResponse(res, statusCode, error) {
    return res.status(statusCode).json({
      status: statusCode,
      error
    });
  }
}

export default ControllersResponse;
