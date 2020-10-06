import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import { user } from "../models/index";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class UserController {
  static async signup(req, res) {
    // Checking if the user already exist
    const userExit = await user.findOne({ where: { email: req.body.email } });
    if (userExit) {
      return res.status(400).json({
        status: 400,
        error: "User already exist with that mail",
      });
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
        delete req.body.password

        if (createdata) {
          res.status(201).json({
            success: 201,
            message: "User Created Successfully",
            data: Object.assign({ id },  req.body, { token }),
          });
        }
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: "something went wrong",
        });
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

          return res.status(200).json({
            status: 200,
            data: Object.assign({ id }, { username }, { token }),
          });
        }
        // The case where the password don't match with the one stored
        return res.status(401).json({
          status: 401,
          message: "Wrong Password",
        });
      }
      // The case where does not exist
      return res.status(404).json({
        status: 404,
        message: "User with the provided email does not exit",
      });
    } catch (e) {
      Errors.errorResponse(res, e);
    }
  }
}

export default UserController;
