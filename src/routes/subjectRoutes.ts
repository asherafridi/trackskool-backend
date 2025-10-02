import { Router } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import subjectController from '../controllers/subjectController';

const router = Router();


router.get('/:classId',AuthMiddleware.authenticate, subjectController.getSubjectsByClassId);
router.post('/:classId',AuthMiddleware.authenticate, subjectController.assignSubjectToClass);
router.patch('/:classId',AuthMiddleware.authenticate, subjectController.updateClassSubject);
router.delete('/:classId/subjects/:subjectId',AuthMiddleware.authenticate, subjectController.removeSubjectFromClass);

export default router;