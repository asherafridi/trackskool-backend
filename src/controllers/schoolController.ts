import SchoolService from '../services/schoolServices';

import { Response } from 'express';
import { AuthenticatedRequest } from '../utils/types';
class schoolController {
    static getSchool = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const school = await SchoolService.getSchool(schoolId);
            return res.status(200).json(school);
        } catch (error) {
            res.status(400).json({ message: 'Registration failed', error });
        }

    }
    static updateSchool = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const { name, address, contact } = req.body;
            const school = await SchoolService.updateSchool(schoolId, name, address, contact);
            return res.status(201).json(school);
        } catch (error) {
            res.status(400).json({ message: 'Registration failed', error });
        }

    }

    static upsertSchoolSettings = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const { passingMarks } = req.body;
            const grade = req.body.grade || null;
            const settings = await SchoolService.upsertSchoolSettings(schoolId, passingMarks, grade);
            return res.status(201).json(settings);
        } catch (error) {
            res.status(400).json({ message: 'Registration failed', error });
        }
    }   
    
    static getSchoolSettings = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const settings = await SchoolService.getSchoolSettings(schoolId);
            return res.status(200).json(settings);
        } catch (error) {
            res.status(400).json({ message: 'Registration failed', error });
        }
    }
    static getSchoolUsers = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const schoolId = req.user.schoolId;
            if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
            const users = await SchoolService.getSchoolUser(schoolId);
            return res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: 'Registration failed', error });
        }
    }
}

export default schoolController