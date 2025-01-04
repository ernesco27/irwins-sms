"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { lessonSchema, LessonSchema } from "@/lib/formValidationSchema";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { createLesson, updateLesson } from "@/lib/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LessonForm = ({
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
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema),
  });

  const [state, formAction] = useFormState(
    type == "create" ? createLesson : updateLesson,
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
      toast(`Lesson ${type === "create" ? "Created" : "updated"} successfully`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers, subjects, classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update" ? "Update Lesson" : "Add New Lesson"}
      </h1>

      <span className="text-xs text-gray-400 font-medium ">
        Lesson Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-lg text-gray-500">Subject Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
          >
            {subjects.map((sub: any) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-lg text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map((clas: any) => (
              <option key={clas.id} value={clas.id}>
                {clas.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-lg text-gray-500">Teacher</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
            {...register("teacherId")}
            defaultValue={data?.teacherId}
          >
            {teachers.map((teacher: any) => (
              <option key={teacher.id} value={teacher.id}>
                {" "}
                {`${teacher.firstName} ${teacher.lastName}`}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-lg text-gray-500">Day</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
            {...register("day")}
            defaultValue={data?.sex}
          >
            <option value="MONDAY">Monday</option>
            <option value="TUESDAY">Tueday</option>
            <option value="WEDNESDAY">Wednesday</option>
            <option value="THURSDAY">Thurday</option>
            <option value="FRIDAY">Friday</option>
          </select>
        </div>

        <InputField
          label="Start Time"
          name="startTime"
          //defaultValue={data?.startTime.toISOString().split("T")[0]}
          defaultValue={
            data?.startTime
              ? new Date(data.startTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          //error={errors?.birthDay}
          type="datetime-local"
        />
        <InputField
          label="End Time"
          name="endTime"
          //defaultValue={data?.startTime.toISOString().split("T")[0]}
          defaultValue={
            data?.endTime
              ? new Date(data.endTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          //error={errors?.birthDay}
          type="datetime-local"
        />

        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            //error={errors?.id}
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

export default LessonForm;
