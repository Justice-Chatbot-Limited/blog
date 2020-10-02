/* Handles controller errors
*
* @class Errors
*/
class Errors {
  /**
   *
   *
   * @static
   * @param {*} res
   * @param {*} e
   * @returns {object} error
   * @memberof errors
   */
  static errorResponse(res, e) {
    return res.status(500).json({
      status: 500,
      error: e.message
    });
  }

  /**
*
*
* @static
* @param {*} res
* @param {*} e
* @returns {object} error
* @memberof Errors
*/
  static joiErrorResponse(res, e) {
    return res.status(400).json({
      status: 400,
      error: e.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
    });
  }
}

export default Errors;
