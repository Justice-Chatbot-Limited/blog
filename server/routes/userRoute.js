import express from "express";

const router = express.Router();

import { createUser, getUser } from "../controllers/userController";

router.route("/signup").post(createUser);
router.route("/user").get(getUser);

export default router;
