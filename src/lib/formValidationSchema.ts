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
