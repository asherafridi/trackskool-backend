import { Router } from 'express';
import AuthController from '../controllers/authController';
import AuthMiddleware from '../middlewares/authMiddleware';
import SchoolController from '../controllers/schoolController';

const router = Router();

router.get('/school',AuthMiddleware.authenticate, SchoolController.getSchool);
router.post('/school',AuthMiddleware.authenticate, SchoolController.updateSchool);

router.post('/school/settings',AuthMiddleware.authenticate, SchoolController.upsertSchoolSettings);
router.get('/school/settings',AuthMiddleware.authenticate, SchoolController.getSchoolSettings);

router.get('/school/users',AuthMiddleware.authenticate, SchoolController.getSchoolUsers);


export default router;