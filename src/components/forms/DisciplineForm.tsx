"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { disciplineSchema, DisciplineSchema } from "@/lib/formValidationSchema";
import { Dispatch, SetStateAction } from "react";

const DisciplineForm = ({
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
  } = useForm<DisciplineSchema>({
    resolver: zodResolver(disciplineSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const incidentTypes = [
    "Examination malpractices",
    "Theft",
    "Vandalism",
    "Fighting",
    "Disobedience",
  ];

  const action = [
    "Verbal Warning",
    "Written Warning",
    "Suspension",
    "Dismissal",
  ];

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update"
          ? "Update Disciplinary Record"
          : "Add New Disciplinary Record"}
      </h1>

      <span className="text-xs text-gray-400 font-medium ">
        Disciplinary Record
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="Student ID"
          name="studentId"
          defaultValue={data?.studentId}
          register={register}
          error={errors?.studentId}
        />
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Class"
          name="class"
          defaultValue={data?.classId}
          register={register}
          error={errors?.classId}
        />
        <InputField
          label="Incident Date"
          name="incidentDate"
          defaultValue={data?.incidentDate}
          register={register}
          error={errors?.incidentDate}
          type="date"
        />
        <InputField
          label="Report Date"
          name="reportDate"
          defaultValue={data?.reportDate}
          register={register}
          error={errors?.reportDate}
        />
        <InputField
          label="Incident Location"
          name="incidentLocation"
          defaultValue={data?.incidentLocation}
          register={register}
          error={errors?.incidentLocation}
        />
        <div className="w-full flex flex-wrap gap-6 justify-center mb-8">
          <textarea
            defaultValue={data?.description}
            {...register("description")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
          ></textarea>
          {errors.description?.message && (
            <p className="text-xs text-red-400">
              {errors.description.message.toString()}
            </p>
          )}
        </div>
        <label className="text-lg text-gray-500">Incident Type</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("incidentType")}
          defaultValue={data?.incidentType}
        >
          {incidentTypes.map((incident, index) => (
            <option value={incident} key={index}>
              {incident}
            </option>
          ))}
        </select>
        <label className="text-lg text-gray-500">Disciplinary Action</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("disciplinaryAction")}
          defaultValue={data?.disciplinaryAction}
        >
          {action.map((act, index) => (
            <option value={act} key={index}>
              {act}
            </option>
          ))}
        </select>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button>
    </form>
  );
};

export default DisciplineForm;
