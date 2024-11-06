"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputField from "../InputField";
import { createSubject, updateSubject } from "@/lib/action";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchema";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction] = useFormState(
    type == "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    },
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `Subject ${type === "create" ? "Created" : "updated"} successfully`,
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const teachers = relatedData?.teachers || [];

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update" ? "Update Subject" : "Create New Subject"}
      </h1>

      <span className="text-xs text-gray-400 font-medium ">
        Subject Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="Subject Name"
          name="subjectName"
          defaultValue={data?.name}
          register={register}
          error={errors?.subjectName}
        />

        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teacher</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teacher}
          >
            {/* <option value="male">Male</option>
            <option value="female">Female</option> */}
            {teachers.map(
              (teacher: {
                id: string;
                firstName: string;
                lastName: string;
              }) => (
                <option
                  key={teacher.id}
                  value={teacher.id}
                >{`${teacher.firstName} ${teacher.lastName} `}</option>
              ),
            )}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>

      {state.error && (
        <span className="text-red-500 text-xs">Something went wrong!</span>
      )}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button>
    </form>
  );
};

export default SubjectForm;
