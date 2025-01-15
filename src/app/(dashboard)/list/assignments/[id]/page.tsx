import Announcements from "@/components/Announcements";
import DisciplinaryHistory from "@/components/DisciplinaryHistory";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import prisma from "@/lib/prisma";
import { getSessionData } from "@/lib/utils";
import { Subject } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const SingleAssignmentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const assignmentId = parseInt(id);
  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      subject: { select: { name: true } },
      class: {
        select: {
          name: true,
        },
      },
      teacher: {
        select: {
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          img: true,
        },
      },
    },
  });

  if (!assignment) {
    return notFound();
  }

  const { role, currentUserId } = await getSessionData();

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-irwinSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={assignment.teacher.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4 ">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {" "}
                  {`${assignment.teacher.firstName} ${assignment.teacher.middleName} ${assignment.teacher.lastName} `}{" "}
                </h1>
                <FormContainer
                  table="assignment"
                  type="update"
                  data={assignment}
                />
              </div>
              <p className="text-sm text-gray-500">Teacher's Info</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{assignment.teacher.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span> {assignment.teacher.phoneNumber} </span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARDs */}

            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semi-bold">
                  {assignment.class.name.charAt(0)}
                  {(() => {
                    const number = parseInt(
                      assignment.class.name.charAt(0),
                      10,
                    );
                    if (number === 1) return "st";
                    if (number === 2) return "nd";
                    if (number === 3) return "rd";
                    return "th";
                  })()}
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semi-bold">
                  {assignment.class.name}
                </h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semi-bold">
                  {assignment.subject.name}
                </h1>
                <span className="text-sm text-gray-400">Subject</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semi-bold text-red-600">
                  {new Intl.DateTimeFormat("en-GB").format(assignment.date)}
                </h1>
                <span className="text-sm text-gray-400">Due Date</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-xl">Class Assignment</h1>
          <p className="mt-6 font-semibold text-lg">Note:</p>
          <div className="w-full min-h-32 rounded-md bg-slate-100 p-4 text-lg">
            {assignment.notes || "No notes for this assignment"}
          </div>
          <p className="mt-4 txt-lg font-semibold">Assignment File:</p>

          <Link href={`${assignment.file}`}>
            <button className="mt-4 bg-green-400 p-2 rounded-md font-semibold hover:scale-110 hover:shadow-md transition-all">
              DOWNLOAD HERE
            </button>
          </Link>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4  flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-irwinSkyLight"
              href={`/list/lessons?classId=${assignment.classId}`}
            >
              {role !== "student" ? "Class Lessons" : "Student's Lessons"}
            </Link>
            <Link
              className="p-3 rounded-md bg-irwinPurpleLight"
              href={`/list/teachers?classId=${assignment.classId}`}
            >
              {role !== "student" ? "Class Teachers" : "Student's Teachers"}
            </Link>
            <Link
              className="p-3 rounded-md bg-irwinYellowLight "
              href={`/list/exams?classId=${assignment.classId}`}
            >
              {role !== "student" ? "Class Exams" : "Student's Exams"}
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/assignments?classId=${assignment.classId}`}
            >
              {role !== "student"
                ? "Class Assignments"
                : "Student's Assignments"}
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
        {role === "student" && (
          <DisciplinaryHistory viewedStudentId={currentUserId!} />
        )}
      </div>
    </div>
  );
};

export default SingleAssignmentPage;
