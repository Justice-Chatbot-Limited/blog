import express from 'express';
import userValidations from '../../middlewares/validations/userValidation';
import UserController from '../controllers/userController';

const router = express.Router();

router.route('/auth/signup').post(userValidations.signup, UserController.signup);
router.route('/auth/signin').post(userValidations.signin, UserController.signin);

export default router;
