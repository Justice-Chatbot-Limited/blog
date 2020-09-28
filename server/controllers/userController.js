import { user } from "../models/index";
import { Sequelize } from "sequelize";

export function createUser(req, res) {
  try {
    let checkdata = user.findOne({ where: { email: req.body.email } });
    if (checkdata) {
      return res.status(400).json({
        status: 400,
        message: "Already Exist",
        data: checkdata,
      });
    } else {
      let createdata = user.create(req.body, {
        fields: ["username", "email", "password"],
      });
      if (createdata) {
        res.json({
          success: true,
          message: "User Created Successfully",
          data: createdata,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export function getUser(req, res) {
}