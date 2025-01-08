"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { examSchema, ExamSchema } from "@/lib/formValidationSchema";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { createExam, updateExam } from "@/lib/action";
import { useFormState } from "react-dom";

const ExamForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const [state, formAction] = useFormState(
    type == "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    },
  );

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data);
      formAction(data);
    },
    (errors) => {
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    },
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Exam ${type === "create" ? "Created" : "updated"} successfully`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { examSubjects, examClass, examTeacher } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update" ? "Update Exam" : "Add New Exam"}
      </h1>

      <span className="text-xs text-gray-400 font-medium ">
        Exam Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-lg text-gray-500">Exam Title</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("subjectId")}
              defaultValue={data?.subjectId}
            >
              {examSubjects.map((lesson: { id: number; name: string }) => {
                return (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-lg text-gray-500">Class</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("classId")}
              defaultValue={data?.classId}
            >
              {examClass.map((classes: { id: number; name: string }) => {
                return (
                  <option key={classes.id} value={classes.id}>
                    {classes.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-lg text-gray-500">Teacher</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("teacherId")}
              defaultValue={data?.teacherId}
            >
              {examTeacher.map(
                (teacher: {
                  id: string;
                  firstName: string;
                  lastName: string;
                }) => {
                  return (
                    <option key={teacher.id} value={teacher.id}>
                      {`${teacher.firstName} ${teacher.lastName}`}
                    </option>
                  );
                },
              )}
            </select>
          </div>
        </div>

        <InputField
          label="Start Date"
          name="startTime"
          defaultValue={
            data?.endTime
              ? new Date(data.startTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          error={errors?.startTime}
          type="dateTime-local"
        />
        <InputField
          label="End Date"
          name="endTime"
          defaultValue={
            data?.endTime
              ? new Date(data.endTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          error={errors?.endTime}
          type="dateTime-local"
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            hidden
          />
        )}
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button>
    </form>
  );
};

export default ExamForm;
