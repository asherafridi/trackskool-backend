import { Router } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import SchoolController from '../controllers/schoolController';

const router = Router();

router.get('/',AuthMiddleware.authenticate, SchoolController.getSchool);
router.post('/',AuthMiddleware.authenticate, SchoolController.updateSchool);

router.post('/settings',AuthMiddleware.authenticate, SchoolController.upsertSchoolSettings);
router.get('/settings',AuthMiddleware.authenticate, SchoolController.getSchoolSettings);

router.get('/users',AuthMiddleware.authenticate, SchoolController.getSchoolUsers);


export default router;