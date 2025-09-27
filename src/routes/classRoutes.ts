import { Router } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import ClassController from '../controllers/classController';

const router = Router();

router.get('/',AuthMiddleware.authenticate, ClassController.getClass);
router.get('/:id',AuthMiddleware.authenticate, ClassController.getClassById);

router.post('/',AuthMiddleware.authenticate, ClassController.createClass);
router.patch('/:id',AuthMiddleware.authenticate, ClassController.updateClass);

router.delete('/:id',AuthMiddleware.authenticate, ClassController.deleteClass);



export default router;