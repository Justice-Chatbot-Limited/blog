import express from 'express';
import auth from '../../middlewares/authentification/auth';
import PostValidation from '../../middlewares/validations/postValidation';
import PostController from '../controllers/postController';

const router = express.Router();

router
  .route('/create')
  .post(
    auth.verifyToken,
    PostValidation.validateCreatePost,
    PostController.createPost
  );

router.route('/posts').get(PostController.getPosts);
router.route('/post/:id').get(PostController.getPost);
router.route('/post/:id').put(auth.verifyToken, PostController.updatePost);
router.route('/post/:id').delete(auth.verifyToken, PostController.deletePost);

export default router;
