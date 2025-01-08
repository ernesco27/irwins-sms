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
  middleName: z.string().optional(),
  phoneNumber: z.string().optional(),
  nationality: z.string().min(1, { message: "Nationality is required!" }),
  nationalId: z.string().min(1, { message: "National ID is required!" }),
  postalAddress: z.string().optional(),
  residenceAddress: z
    .string()
    .min(1, { message: "Residence Address is required!" }),
  digitalAddress: z
    .string()
    .min(1, { message: "Digital Address is required!" }),

  birthDay: z.coerce.date({ message: "Date of Birth is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  bloodGroup: z.string().min(1, { message: "Blood Group is required!" }),
  sickling: z.string().min(1, { message: "Sickling is required!" }),
  allergies: z.string().min(1, { message: "Allergy is required!" }),
  healthConditions: z
    .string()
    .min(1, { message: "Health Condition is required!" }),
  medications: z.string().min(1, { message: "Medication is required!" }),
  subjects: z.array(z.string()).optional(),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const teacherStepSchemas = {
  1: z.object({
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
  }),

  2: z.object({
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    middleName: z.string().optional(),
    birthDay: z.coerce.date({ message: "Date of Birth is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    nationality: z.string().min(1, { message: "Nationality is required!" }),
    nationalId: z.string().min(1, { message: "National ID is required!" }),
  }),
  3: z.object({
    phoneNumber: z.string().optional(),
    postalAddress: z.string().optional(),
    residenceAddress: z
      .string()
      .min(1, { message: "Residence Address is required!" }),
    digitalAddress: z
      .string()
      .min(1, { message: "Digital Address is required!" }),
  }),

  4: z.object({
    bloodGroup: z.string().min(1, { message: "Blood Group is required!" }),
    sickling: z.string().min(1, { message: "Sickling is required!" }),
    allergies: z.string().min(1, { message: "Allergy is required!" }),
    healthConditions: z
      .string()
      .min(1, { message: "Health Condition is required!" }),
    medications: z.string().min(1, { message: "Medication is required!" }),
  }),
  5: z.object({
    img: z.string().optional(),
    subjects: z.array(z.string()).optional(),
  }),
};

export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(10, { message: "Username must be at most 10 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional(),
  password: z.string().optional(),
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
});

export type ParentSchema = z.infer<typeof parentSchema>;

const immunizationRecordSchema = z.object({
  vaccineName: z.string().optional(),
  vaccineType: z.string().optional(),
  vaccineDose: z.string().optional(),
  vaccineDate: z
    .string()
    .transform((val) => (val ? new Date(val) : null))
    .nullable()
    .optional(),
});

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
  middleName: z.string().optional(),
  phoneNumber: z.string().optional(),
  nationality: z.string().min(1, { message: "Nationality is required!" }),
  nationalId: z.string().min(1, { message: "National ID is required!" }),
  postalAddress: z.string().optional(),
  residenceAddress: z
    .string()
    .min(1, { message: "Residence Address is required!" }),
  digitalAddress: z
    .string()
    .min(1, { message: "Digital Address is required!" }),

  birthDay: z.coerce.date({ message: "Date of Birth is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  bloodGroup: z.string().min(1, { message: "Blood Group is required!" }),
  sickling: z.string().min(1, { message: "Sickling is required!" }),
  fullNameOfGuardian: z.string().min(1, { message: "Full Name is required!" }),
  relationOfGuardian: z.string().min(1, { message: "Relation is required!" }),
  phoneNumberOfGuardian: z
    .string()
    .min(1, { message: "Phone Number is required!" }),
  emailOfGuardian: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),

  parentId: z.string().min(1, { message: "Parent is required!" }),

  immunizationRecords: z
    .array(immunizationRecordSchema)
    .min(1, "At least one immunization record is required"),
  allergies: z.string().min(1, { message: "Allergy is required!" }),
  healthConditions: z
    .string()
    .min(1, { message: "Health Condition is required!" }),
  medications: z.string().min(1, { message: "Medication is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const studentStepSchemas = {
  1: z.object({
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
  }),

  2: z.object({
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    middleName: z.string().optional(),
    birthDay: z.coerce.date({ message: "Date of Birth is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    parentId: z.string().min(1, { message: "Parent is required!" }),
    nationality: z.string().min(1, { message: "Nationality is required!" }),
    nationalId: z.string().min(1, { message: "National ID is required!" }),
  }),
  3: z.object({
    phoneNumber: z.string().optional(),
    postalAddress: z.string().optional(),
    residenceAddress: z
      .string()
      .min(1, { message: "Residence Address is required!" }),
    digitalAddress: z
      .string()
      .min(1, { message: "Digital Address is required!" }),
  }),
  4: z.object({
    fullNameOfGuardian: z
      .string()
      .min(1, { message: "Full Name is required!" }),
    relationOfGuardian: z.string().min(1, { message: "Relation is required!" }),
    phoneNumberOfGuardian: z
      .string()
      .min(1, { message: "Phone Number is required!" }),
    emailOfGuardian: z
      .string()
      .email({ message: "Invalid email address!" })
      .optional()
      .or(z.literal("")),
  }),
  5: z.object({
    bloodGroup: z.string().min(1, { message: "Blood Group is required!" }),
    sickling: z.string().min(1, { message: "Sickling is required!" }),

    immunizationRecords: z.array(immunizationRecordSchema).optional(),

    allergies: z.string().min(1, { message: "Allergy is required!" }),
    healthConditions: z
      .string()
      .min(1, { message: "Health Condition is required!" }),
    medications: z.string().min(1, { message: "Medication is required!" }),
  }),
  6: z.object({
    img: z.string().optional(),
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    classId: z.coerce.number().min(1, { message: "Class is required!" }),
  }),
};

export const disciplineSchema = z.object({
  id: z.number().optional(),
  offense: z.string().min(1, { message: "Offense is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  incidentDate: z.coerce.date({ message: "Incident Date is required!" }),
  reportDate: z.coerce.date({ message: "Report Date is required!" }),
  incidentLocation: z
    .string()
    .min(1, { message: "Incident Location is required!" }),
  disciplinaryAction: z
    .string()
    .min(1, { message: "Disciplinary Action is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  studentId: z.string().min(1, { message: "Student ID is required!" }),
});

export type DisciplineSchema = z.infer<typeof disciplineSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  // title: z.string().min(1, { message: "Exam Title is required!" }),
  startTime: z.coerce.date({ message: "Start Time is required!" }),
  endTime: z.coerce.date({ message: "End Time is required!" }),

  subjectId: z.coerce.number().min(1, { message: "Exam Title is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  teacherId: z.string().min(1, { message: "Teacher is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
    message: "Day is required!",
  }),
  startTime: z.coerce.date({ message: "Start Time is required!" }),
  endTime: z.coerce.date({ message: "End Time is required!" }),
  subjectId: z.coerce.number().min(1, { message: "Subject is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  teacherId: z.string().min(1, { message: "Teacher is required!" }),
});

export type LessonSchema = z.infer<typeof lessonSchema>;
