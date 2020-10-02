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
      
        if (createdata) {
          res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: Object.assign({ token }, createUser),
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
}

export default UserController;
