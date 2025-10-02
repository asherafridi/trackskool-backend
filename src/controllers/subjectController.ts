import { Response } from 'express';
import { AuthenticatedRequest } from '../utils/types';
import SubjectServices from '../services/subjectService';

class subjectController {
    static getSubjectsByClassId = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const classId = req.params.classId;
            if (!classId) return res.status(400).json({ message: 'Class ID is required' });
            const subjects = await SubjectServices.getSubjectsByClassId(classId);
            return res.status(200).json(subjects);
        } catch (error) {
            res.status(400).json({ message: 'Getting Subjects Error', error });
        }
    }
    static assignSubjectToClass = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const classId = req.params.classId;
            const subjects = req.body.subjects;
            if (!classId) return res.status(400).json({ message: 'Class ID is required' }); 
            if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
                return res.status(400).json({ message: 'Subjects array is required' });
            }
            const assignedSubjects = await SubjectServices.assignSubjectToClass(classId, subjects);
            return res.status(201).json(assignedSubjects);
        } catch (error) {
            res.status(400).json({ message: 'Assigning Subjects Error', error });
        }
    }
    static removeSubjectFromClass = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const classId = req.params.classId;
            const subjectId = req.params.subjectId;
            if (!classId || !subjectId) return res.status(400).json({ message: 'Class ID and Subject ID are required' });
            const deletedSubject = await SubjectServices.removeSubjectFromClass(classId, subjectId);
            return res.status(200).json(deletedSubject);
        } catch (error) {
            res.status(400).json({ message: 'Removing Subject Error', error });
        }
    }
    static updateClassSubject = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const classId = req.params.classId;
            const subjects = req.body.subjects;
            if (!classId) return res.status(400).json({ message: 'Class ID is required' });
            if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
                return res.status(400).json({ message: 'Subjects array is required' });
            }
            const updatedSubjects = await SubjectServices.updateClassSubject(classId, subjects);
            return res.status(200).json(updatedSubjects);
        } catch (error) {
            res.status(400).json({ message: 'Updating Subjects Error', error });
        }
    }
}

export default subjectController;