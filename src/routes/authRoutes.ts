import { Router } from 'express';
import AuthController from '../controllers/authController';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', AuthController.signup);
router.post('/login', AuthController.login);
router.get(
  '/user/:id',
  AuthMiddleware.authenticate,
  AuthController.getUserById
);

export default router;