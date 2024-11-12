import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { getSessionData } from "@/lib/utils";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const SubjectTeachers = await prisma.teacher.findMany({
          select: { id: true, firstName: true, lastName: true },
        });

        relatedData = { teachers: SubjectTeachers };

        break;
      case "class":
        const ClassGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });

        const ClassTeachers = await prisma.teacher.findMany({
          select: { id: true, firstName: true, lastName: true },
        });

        relatedData = { teachers: ClassTeachers, grades: ClassGrades };

        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });

        relatedData = { subjects: teacherSubjects };

        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });

        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });

        relatedData = { classes: studentClasses, grades: studentGrades };

        break;
      case "exam":
        const { currentUserId, role } = await getSessionData();

        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };

        break;

      default:
        break;
    }
  }

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
