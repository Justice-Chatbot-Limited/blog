import { Sequelize } from "sequelize";
import { user } from "../models/index";

export class UserController {
  static async signup(req, res) {
    const userExit = await user.findOne({ where: { email: req.body.email } });
    console.log(userExit);
    console.log(userExit)

    if (userExit) {
      return res.status(400).json({
        status: 400,
        error: "User already exist with that mail",
      });
    } else {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const createdata = await user.create(newUser);
      if (createdata) {
        res.json({
          success: true,
          message: "User Created Successfully",
          data: createdata,
        });
      }
    }
  }
}

export default UserController;
