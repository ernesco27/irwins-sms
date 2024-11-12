import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  subjectName: z.string().min(1, { message: "Subject Name is required!" }),
  teachers: z
    .array(z.string())
    .min(1, { message: "At least 1 teacher required!" }),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(10, { message: "Username must be at most 10 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  phoneNumber: z.string().optional(),
  address: z.string().min(1, { message: "Address is required!" }),
  birthDay: z.coerce.date({ message: "Date of Birth is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  subjects: z.array(z.string()).optional(),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(10, { message: "Username must be at most 10 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  phoneNumber: z.string().optional(),
  address: z.string().min(1, { message: "Address is required!" }),
  birthDay: z.coerce.date({ message: "Date of Birth is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Exam Title is required!" }),
  startTime: z.coerce.date({ message: "Start Time is required!" }),
  endTime: z.coerce.date({ message: "E  Time is required!" }),

  lessonId: z.coerce.number().min(1, { message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
