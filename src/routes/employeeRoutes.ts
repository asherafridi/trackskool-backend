import { Router } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import EmployeeController from '../controllers/employeeController';

const router = Router();

router.get('/',AuthMiddleware.authenticate, EmployeeController.getEmployees);
router.get('/teachers',AuthMiddleware.authenticate, EmployeeController.getTeachers);

router.get('/:id',AuthMiddleware.authenticate, EmployeeController.getEmployeeById);

router.post('/',AuthMiddleware.authenticate, EmployeeController.createEmployee);
router.patch('/:id',AuthMiddleware.authenticate, EmployeeController.updateEmployee);

router.delete('/:id',AuthMiddleware.authenticate, EmployeeController.deleteEmployee);



export default router;