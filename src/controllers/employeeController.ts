import { Response } from 'express';
import { AuthenticatedRequest } from '../utils/types';
import EmployeeServices from '../services/employeeServices';

class EmployeeController {
    static getEmployees = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const employees = await EmployeeServices.getEmployeesBySchoolId(schoolId);
            return res.status(200).json(employees);
        } catch (error) {
            res.status(400).json({ message: 'Getting Employees Error', error });
        }  
    }

    static getTeachers = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId; 
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const teachers = await EmployeeServices.getTeachersBySchoolId(schoolId);
            return res.status(200).json(teachers);
        } catch (error) {
            res.status(400).json({ message: 'Getting Teachers Error', error });
        }
    }

    static getEmployeeById = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'Employee ID is required' });
            const employee = await EmployeeServices.getEmployeeById(id);
            return res.status(200).json(employee);
        } catch (error) {
            res.status(400).json({ message: 'Getting Employee Error', error });
        }     
    }

    static createEmployee = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const { name, picture, mobile, dateOfJoining, monthlySalary, role, guardianName,gender, experience, nationalId, religion, education, bloodGroup,dateofBirth, address} = req.body;
            if (!name || !mobile || !dateOfJoining || !monthlySalary || !role) {
                return res.status(400).json({ message: 'Name, Mobile, Date of Joining, Monthly Salary and Role are required' });
            }

            const data = {
                name,
                picture: picture || null,
                mobile,
                dateOfJoining: new Date(dateOfJoining),
                monthlySalary: parseFloat(monthlySalary),
                role,
                gender: gender || null,
                guardianName: guardianName || null,
                experience: experience || null,
                nationalId: nationalId || null,
                religion: religion || null,
                education: education || null,
                bloodGroup: bloodGroup || null,
                dateofBirth: dateofBirth ? new Date(dateofBirth) : null,
                address: address || null,

            }
            const employee = await EmployeeServices.createEmployee(data, schoolId);
            return res.status(201).json(employee);
        } catch (error) {
            res.status(400).json({ message: 'Creating Employee Error', error });
        }   
    }

    static updateEmployee = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'Employee ID is required' });
            
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const { name, picture, mobile, dateOfJoining, monthlySalary, role, guardianName,gender, experience, nationalId, religion, education, bloodGroup,dateofBirth, address} = req.body;

            const data = {
                name,
                picture: picture || null,
                mobile,
                dateOfJoining: new Date(dateOfJoining),
                monthlySalary: parseFloat(monthlySalary),
                role,
                gender: gender || null,
                guardianName: guardianName || null,
                experience: experience || null,
                nationalId: nationalId || null,
                religion: religion || null,
                education: education || null,
                bloodGroup: bloodGroup || null,
                dateofBirth: dateofBirth ? new Date(dateofBirth) : null,
                address: address || null,

            }
            const employee = await EmployeeServices.updateEmployee(data, id);
            return res.status(201).json(employee);
        } catch (error) {
            res.status(400).json({ message: 'Updating Employee Error', error });
        }
    }

    static deleteEmployee = async (req: AuthenticatedRequest, res: Response) => {  
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'Employee ID is required' });
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            await EmployeeServices.deleteEmployee(id);
            return res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Deleting Employee Error', error });
        }
    }
}

export default EmployeeController;