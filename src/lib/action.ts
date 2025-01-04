"use server";

import { revalidatePath } from "next/cache";
import {
  ClassSchema,
  DisciplineSchema,
  ExamSchema,
  LessonSchema,
  ParentSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchema";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { getSessionData } from "./utils";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.subjectName,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.subjectName,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema,
) => {
  try {
    await prisma.class.create({
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema,
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema,
) => {
  try {
    const user = await (
      await clerkClient()
    ).users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        nationality: data.nationality,
        email: data.email,
        phoneNumber: data.phoneNumber,
        postalAddress: data.postalAddress,
        residenceAddress: data.residenceAddress,
        digitalAddress: data.digitalAddress,
        sickling: data.sickling,
        allergies: data.allergies,
        healthConditions: data.healthConditions,
        medications: data.medications,
        img: data.img,
        bloodGroup: data.bloodGroup,
        sex: data.sex,
        birthday: data.birthDay,
        subjects: {
          connect: data.subjects?.map((subjectName: string) => ({
            //id: parseInt(subjectId),
            name: subjectName,
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema,
) => {
  try {
    if (!data.id) {
      return { success: false, error: true };
    }
    const user = await (
      await clerkClient()
    ).users.updateUser(data.id, {
      ...(data.password !== "" && { password: data.password }),
      username: data.username,

      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        postalAddress: data.postalAddress,
        residenceAddress: data.residenceAddress,
        digitalAddress: data.digitalAddress,
        sickling: data.sickling,
        allergies: data.allergies,
        healthConditions: data.healthConditions,
        medications: data.medications,

        img: data.img,
        bloodGroup: data.bloodGroup,
        sex: data.sex,
        birthday: data.birthDay,
        subjects: {
          set: data.subjects?.map((subjectName: string) => ({
            //id: parseInt(subjectId),
            name: subjectName,
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await (await clerkClient()).users.deleteUser(id);

    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema,
) => {
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }

    const user = await (
      await clerkClient()
    ).users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,

      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        img: data.img,
        bloodGroup: data.bloodGroup,
        sickling: data.sickling,
        birthday: data.birthDay,
        sex: data.sex,
        nationality: data.nationality,
        nationalId: data.nationalId,
        postalAddress: data.postalAddress,
        residenceAddress: data.residenceAddress,
        digitalAddress: data.digitalAddress,
        fullNameOfGuardian: data.fullNameOfGuardian,
        relationOfGuardian: data.relationOfGuardian,
        phoneNumberOfGuardian: data.phoneNumberOfGuardian,
        emailOfGuardian: data.emailOfGuardian,
        immunizationRecords: data.immunizationRecords,
        allergies: data.allergies,
        healthConditions: data.healthConditions,
        medications: data.medications,
        parentId: data.parentId,
        gradeId: data.gradeId,
        classId: data.classId,
      },
    });

    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);

    return {
      success: false,
      error: true,
    };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema,
) => {
  try {
    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        img: data.img,
        bloodGroup: data.bloodGroup,
        sickling: data.sickling,

        birthday: data.birthDay,
        sex: data.sex,
        nationality: data.nationality,
        nationalId: data.nationalId,
        postalAddress: data.postalAddress,
        residenceAddress: data.residenceAddress,
        digitalAddress: data.digitalAddress,
        fullNameOfGuardian: data.fullNameOfGuardian,
        relationOfGuardian: data.relationOfGuardian,
        phoneNumberOfGuardian: data.phoneNumberOfGuardian,
        emailOfGuardian: data.emailOfGuardian,

        immunizationRecords: data.immunizationRecords,

        allergies: data.allergies,
        healthConditions: data.healthConditions,
        medications: data.medications,
        parentId: data.parentId,
        gradeId: data.gradeId,
        classId: data.classId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await (await clerkClient()).users.deleteUser(id);

    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const createDisciplinaryRecord = async (
  currentState: CurrentState,
  data: DisciplineSchema,
) => {
  try {
    await prisma.disciplinaryHistory.create({
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateDisciplinaryRecord = async (
  currentState: CurrentState,
  data: DisciplineSchema,
) => {
  try {
    await prisma.disciplinaryHistory.update({
      where: {
        id: data.id,
      },
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteDisciplinaryRecord = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await prisma.disciplinaryHistory.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const createParent = async (
  currentState: CurrentState,
  data: ParentSchema,
) => {
  try {
    const user = await (
      await clerkClient()
    ).users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: { role: "parent" },
    });

    await prisma.parent.create({
      data: {
        id: user.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateParent = async (
  currentState: CurrentState,
  data: ParentSchema,
) => {
  try {
    if (!data.id) {
      return { success: false, error: true };
    }
    const user = await (
      await clerkClient()
    ).users.updateUser(data.id, {
      ...(data.password !== "" && { password: data.password }),
      username: data.username,

      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: { role: "parent" },
    });

    await prisma.parent.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteParent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await (await clerkClient()).users.deleteUser(id);

    await prisma.parent.delete({
      where: {
        id: id,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema,
) => {
  const { currentUserId, role } = await getSessionData();
  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: currentUserId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema,
) => {
  const { currentUserId, role } = await getSessionData();
  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: currentUserId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  const { currentUserId, role } = await getSessionData();

  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher"
          ? { lesson: { teacherId: currentUserId! } }
          : {}),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};

export const createLesson = async (
  currentState: CurrentState,
  data: LessonSchema,
) => {
  try {
    await prisma.lesson.create({
      data: {
        //name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateLesson = async (
  currentState: CurrentState,
  data: LessonSchema,
) => {
  try {
    await prisma.lesson.update({
      where: {
        id: data.id,
      },
      data: {
        //name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteLesson = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await prisma.lesson.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);

    return { success: false, error: true };
  }
};
