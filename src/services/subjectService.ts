import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

interface Subject {
    id: number;
    name: string;
    maxMarks: string;
    classId: number;
}
class SubjectServices {
    static getSubjectsByClassId = async (classId: string) => {
        const subjects = await prisma.subject.findMany({
            where: { class: { id: parseInt(classId) } }
        });
        return subjects;
    }
    static assignSubjectToClass = async (classId: string, subjects: Subject[]) => {
        const assignedSubjects = await prisma.subject.createMany({
            data: subjects.map(subject => ({
                name: subject.name,
                maxMarks: +subject.maxMarks,
                classId: parseInt(classId)
            })),
            skipDuplicates: true,
        });
        return assignedSubjects;
    }
    static removeSubjectFromClass = async (classId: string, subjectId: string) => {
        const deletedSubject = await prisma.subject.deleteMany({
            where: { id: parseInt(subjectId), classId: parseInt(classId) }
        });
        return deletedSubject;
    }

    static updateClassSubject = async (classId: string, subjects: Subject[]) => {
        const updatedSubjects = [];

        for (const subject of subjects) {
            let updatedSubject;

            if (subject.id) {
                // If subject has id -> update
                updatedSubject = await prisma.subject.update({
                    where: { id: +subject.id },
                    data: {
                        name: subject.name,
                        maxMarks: +subject.maxMarks,
                    },
                });
            } else {
                // If subject.id is null -> create
                updatedSubject = await prisma.subject.create({
                    data: {
                        name: subject.name,
                        maxMarks: +subject.maxMarks,
                        classId: parseInt(classId),
                    },
                });
            }

            updatedSubjects.push(updatedSubject);
        }
        return updatedSubjects;
    }
}

export default SubjectServices;