import { Response } from 'express';
import { AuthenticatedRequest } from '../utils/types';
import ClassServices from '../services/classServices';

class ClassController {
  static getClass = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const schoolId = req.user.schoolId;
      if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
      const classes = await ClassServices.getClassesBySchoolId(schoolId);
      return res.status(200).json(classes);
    } catch (error) {
      res.status(400).json({ message: 'Getting Class Error', error });
    }
  }
  static getClassById = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ message: 'Class ID is required' });
      const school = await ClassServices.getClassById(id);
      return res.status(200).json(school);
    } catch (error) {
      res.status(400).json({ message: 'Getting Class Error', error });
    }
  }

  static createClass = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const schoolId = req.user.schoolId;
      if (!schoolId) return res.status(400).json({ message: 'Access Denied' });
      const { name, teacherId } = req.body;
      if (!name || !teacherId) {
        return res.status(400).json({ message: 'Name and Teacher ID are required' });
      }
      const newClass = await ClassServices.createClass(name, schoolId, teacherId);
      return res.status(201).json(newClass);
    } catch (error) {
      res.status(400).json({ message: 'Creating Class Error', error });
    }
  }
  static updateClass = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ message: 'Class ID is required' });
      const { name, teacherId } = req.body;

      const data: { name?: string, classTeacherId?: string } = {};
      if (name) data.name = name;
      if (teacherId) data.classTeacherId = teacherId;
      const updatedClass = await ClassServices.updateClass(data, id);
      return res.status(200).json(updatedClass);
    } catch (error) {
      res.status(400).json({ message: 'Updating Class Error', error });
    }
  }

  static deleteClass = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ message: 'Class ID is required' });
      const deletedClass = await ClassServices.deleteClass(id);
      return res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Deleting Class Error', error });
    }
  }
}

export default ClassController;