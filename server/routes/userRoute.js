import express from 'express';

import UserController from '../controllers/userController';

const router = express.Router();

router.route('/signup').post(UserController.signup);
// router.route('/user').get(UserController.getUser);

export default router;
