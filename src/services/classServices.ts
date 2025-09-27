import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

class ClassServices {
    static getClassesBySchoolId = async (schoolId: string) => {
        const classes = await prisma.class.findMany({
            where: { schoolId: parseInt(schoolId) },
            include: { subjects: true },
        });
        return classes;
    }
    static getClassById = async (id: string) => {
        const classData = await prisma.class.findUniqueOrThrow({
            where: { id: parseInt(id) },
            include: { subjects: true },
        });
        return classData;
    }

    static createClass = async ( name: string, schoolId: string, teacherId:string) => {

        const newClass = await prisma.class.create({
        data: {
            name: name,
            schoolId: parseInt(schoolId),
            classTeacherId: parseInt(teacherId),
        }
        });
        return newClass;
    }

    static updateClass = async ( data: {name?:string, classTeacherId?:string}, id: string) => {

        const updatedClass = await prisma.class.update({
        where: { id: parseInt(id) },
        data: {
            ...(data.name !== undefined && { name: data.name }),
            classTeacherId: data.classTeacherId ? parseInt(data.classTeacherId) : null,
        }
        });
        return updatedClass;
    }

    static deleteClass = async ( id: string) => {

        const deletedClass = await prisma.class.delete({
        where: { id: parseInt(id) },
        });
        return deletedClass;
    }

}

export default ClassServices;