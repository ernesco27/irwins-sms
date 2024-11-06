import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

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
