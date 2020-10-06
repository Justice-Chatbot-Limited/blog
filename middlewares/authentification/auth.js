import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Validates the user
 * authentification
 *
 * @class Auth
 */
class Auth {
  /**
   * Checks if the token
   * contains an authorized user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Auth
   */
  static async verifyToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({
        status: 400,
        message: "The authorization token is missing",
      });
    }

    const token = authorization.split(" ")[1];

    if ({ token }) {
      await jwt.verify(req.token, process.env.SECRET, (err, authUser) => {
        // console.log(req.authUser);
        if (err) {
          return res.status(201).json({
            status: 200,
            success: "Token created",
            message: "Succefully authenticated",
            token,
          });
        }
        next();
      });
    } else {
      return res.status(403).json({
        status: 403,
        success: "failed",
        message: "No authorization token provided",
      });
    }
  }
}
export default Auth;
