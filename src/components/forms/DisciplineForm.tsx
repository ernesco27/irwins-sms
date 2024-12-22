"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { disciplineSchema, DisciplineSchema } from "@/lib/formValidationSchema";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import {
  createDisciplinaryRecord,
  updateDisciplinaryRecord,
} from "@/lib/action";

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

  const [state, formAction] = useFormState(
    type == "create" ? createDisciplinaryRecord : updateDisciplinaryRecord,
    {
      success: false,
      error: false,
    },
  );

  const incidentTypes = [
    "Examination malpractice",
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

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `Disciplinary Record ${
          type === "create" ? "Created" : "updated"
        } successfully`,
      );
      setOpen(false);
      router.refresh();
    }

    // if (state.error) {
    //   // Show the error message if it exists
    //   toast.error(
    //     state.message || "An error occurred while creating the student.",
    //   );
    // }
  }, [state, router, type, setOpen]);

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

  const { classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update"
          ? "Update Disciplinary Record"
          : "Add New Disciplinary Record"}
      </h1>

      <span className="text-lg text-gray-400 font-medium ">
        Disciplinary Record
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="Student ID"
          name="studentId"
          defaultValue={data?.studentId}
          register={register}
          //error={errors?.studentId}
        />
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-lg text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map((studentClass: { id: number; name: string }) => (
              <option value={studentClass.id} key={studentClass.id}>
                {studentClass.name}
              </option>
            ))}
          </select>
        </div>
        <div className={"flex flex-col gap-2 w-full md:w-2/5"}>
          <label className="text-lg text-gray-500">Offense</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("offense")}
            defaultValue={data?.offense}
          >
            {incidentTypes.map((incident, index) => (
              <option value={incident} key={index}>
                {incident}
              </option>
            ))}
          </select>
        </div>
        <InputField
          label="Incident Location"
          name="incidentLocation"
          defaultValue={data?.incidentLocation}
          register={register}
          // error={errors?.incidentLocation}
        />
        <InputField
          label="Incident Date"
          name="incidentDate"
          defaultValue={data?.incidentDate.toISOString().split("T")[0]}
          register={register}
          // error={errors?.incidentDate}
          type="date"
        />
        <InputField
          label="Report Date"
          name="reportDate"
          defaultValue={data?.reportDate.toISOString().split("T")[0]}
          register={register}
          // error={errors?.reportDate}
          type="date"
        />
        <div className="w-full flex flex-wrap gap-6 mt-4 mb-4">
          <label className="text-lg text-gray-500">Incident Descriptiton</label>
          <textarea
            defaultValue={data?.description}
            {...register("description")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
          ></textarea>
          {/* {errors.description?.message && (
            <p className="text-xs text-red-400">
              {errors.description.message.toString()}
            </p>
          )} */}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-2/5">
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

export default DisciplineForm;
