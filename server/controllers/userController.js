import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Errors } from "../../helpers/errors";
import { user } from "../models/index";
import ControllersResponse from "../helpers/responses";
import {
  emailExist,
  wrongCreditentialsMsg,
} from "../constante/customeMessages";
import {
  successCode,
  createdCode,
  errorCode,
  badRequestCode,
  forbiddenCode,
  unauthorizedCode,
  internalServerErrorCode,
} from "../constante/statusCodes";
import {
  successMsg,
  failMsg,
  badRequestMsg,
  notFound,
  forbidddenMsg,
  internalServerErroMsg,
} from "../constante/statusMessages";
dotenv.config();

export class UserController {
  static async signup(req, res) {
    // Checking if the user already exist
    const userExit = await user.findOne({ where: { email: req.body.email } });
    if (userExit) {
      ControllersResponse.errorResponse(res, badRequestCode, emailExist);
    } else {
      const { username, email, password } = req.body;
      try {
        // Using by bcrypt to crypt the password
        const pass_salt = await bcrypt.genSalt(10);
        // Removed -
        const hashed_pass = await bcrypt.hash(password, pass_salt);
        const createUser = {
          username: username,
          email: email,
          password: hashed_pass,
        };
        // Adding the user in the database
        const createdata = await user.create(createUser);
        const getId = await user.findOne({
          where: { email: req.body.email },
        });
        // Getting the registered user ID from the database
        const id = getId.id;

        // Generate the token
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: "24h",
        });

        // Remove the password
        delete req.body.password;

        if (createdata) {
          const data = Object.assign({ id }, req.body, { token });
          ControllersResponse.successResponse(
            res,
            createdCode,
            successMsg,
            data
          );
        }
      } catch (e) {
        Errors.errorResponse(res, e);
      }
    }
  }
  /**
   * Signin the user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async signin(req, res) {
    const { email, password } = req.body;
    try {
      // Checking if the user already exist
      const currentUser = await user.findOne({
        where: { email: req.body.email },
      });
      if (currentUser) {
        // Compare if the password provide by user match the one in the database
        const passwMatch = await bcrypt.compare(password, currentUser.password);

        if (passwMatch) {
          const { id, username } = currentUser;
          // Generating the token
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: "24H",
          });
          const data = Object.assign({ id }, { username }, { token });
          ControllersResponse.successResponse(
            res,
            successCode,
            successMsg,
            data
          );
        }
        // The case where the password don't match with the one stored
        ControllersResponse.errorResponse(
          res,
          unauthorizedCode,
          wrongCreditentialsMsg
        );
        // return res.status(401).json({
        //   status: 401,
        //   message: "Wrong Password",
        // });
      }
      // The case where the user does not exist
      ControllersResponse.errorResponse(
        res,
        unauthorizedCode,
        wrongCreditentialsMsg
      );
    } catch (e) {
      Errors.errorResponse(res, e);
    }
  }
}

export default UserController;
