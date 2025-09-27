import { create } from 'domain';
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

import type { Role } from '../generated/prisma';

interface EmployeeData {
    name: string;
    picture: string | null;
    mobile: string;
    dateOfJoining: Date;
    monthlySalary: number;
    guardianName: string | null;
    gender: string | null;
    experience: string | null;
    nationalId: string | null;
    religion: string | null;
    education: string | null;
    bloodGroup: string | null;
    dateofBirth: Date | null;
    address: string | null;
    role: Role;
}

class EmployeeServices {
    static getEmployeesBySchoolId = async (schoolId: string) => {
        const employees = await prisma.employee.findMany({
            where: { schoolId: parseInt(schoolId) },
            select:{
                id:true,
                name:true,
            }
        });
        return employees;
    }

    static getTeachersBySchoolId = async (schoolId: string) => {
        const teachers = await prisma.employee.findMany({
            where: { schoolId: parseInt(schoolId), role: 'TEACHER' }
        });
        return teachers;
    }

    static getEmployeeById = async (id: string) => {
        const employee = await prisma.employee.findUniqueOrThrow({
            where: { id: parseInt(id) }
        });
        return employee;
    }

    static createEmployee = async (data: EmployeeData, schoolId: string) => {

        const newEmployee = await prisma.employee.create({
        data: {
            name: data.name,
            picture: data.picture,
            mobile: data.mobile,
            dateOfJoining: data.dateOfJoining,
            monthlySalary: data.monthlySalary,
            guardianName: data.guardianName,
            gender: data.gender,
            experience: data.experience,
            nationalId: data.nationalId,
            religion: data.religion,
            education: data.education,
            bloodGroup: data.bloodGroup,
            dateofBirth: data.dateofBirth,
            address: data.address,
            role: data.role,
            schoolId: parseInt(schoolId),
        }
    });
        return newEmployee;
    }

    static updateEmployee = async (data: Partial<EmployeeData>,id:string) => {
        const updatedEmployee = await prisma.employee.update({
            where: { id: parseInt(id) },
            data: { ...data
             }
        });
        return updatedEmployee;
    }

    static deleteEmployee = async (id: string) => {
        
        const deletedEmployee = await prisma.employee.delete({
            where: { id: parseInt(id) }
        });
        return deletedEmployee;
    }

}

export default EmployeeServices;