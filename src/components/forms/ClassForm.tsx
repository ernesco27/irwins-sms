"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  class: z.string().min(1, { message: "Class Name is required!" }),
  capacity: z.string().min(1, { message: "Capacity is required!" }),
  supervisor: z.string().min(1, { message: "Supervisor is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update" ? "Update Class" : "Add New Class"}
      </h1>

      <span className="text-xs text-gray-400 font-medium ">
        Class Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="Class Name"
          name="class"
          defaultValue={data?.class}
          register={register}
          error={errors?.class}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
          type="number"
        />
        <InputField
          label="Class"
          name="class"
          defaultValue={data?.class}
          register={register}
          error={errors?.class}
        />
        <InputField
          label="Supervisor"
          name="supervisor"
          defaultValue={data?.supervisor}
          register={register}
          error={errors?.supervisor}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button>
    </form>
  );
};

export default ClassForm;
