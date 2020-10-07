import express from 'express';
import postRouter from './postRoute';
import userRoute from './userRoute';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/user', userRoute);
router.use('/post', postRouter);

export default router;
