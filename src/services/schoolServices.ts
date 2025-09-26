import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();
interface grade {
    grade: string;
    minPercentage: number;
    maxPercentage: number;
}
class SchoolService {
    static getSchool = async (id: string) => {
        const school = await prisma.school.findUnique({
            where: { id: parseInt(id) },
        });
        return school;
    }

    static updateSchool = async (id: string, name: string, address: string, contact: string) => {
        const school = await prisma.school.update({
            where: { id: parseInt(id) },
            data: { name, address, contact },
        });
        return school;
    }

    static upsertSchoolSettings = async (id: string, passingmarks: string, grades: grade[]) => {
        const settings = await prisma.schoolSetting.upsert({
            where: { schoolId: parseInt(id) },
            update: { passingMarks: parseInt(passingmarks) },
            create: { schoolId: parseInt(id), passingMarks: parseInt(passingmarks) },
        });
        return settings;
    };

    static getSchoolSettings = async (id: string) => {
        const settings = await prisma.schoolSetting.findUnique({
            where: { schoolId: parseInt(id) },
            include: { gradingScale: true }, 
        }); 
        
        return settings;
    }

    static getSchoolUser = async (id: string) => {
        const users = await prisma.user.findMany({
            where: { schoolId: parseInt(id) },
        });
        return users;
    }
}


export default SchoolService;