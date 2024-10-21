"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),

  date: z.date({ message: "Date is required!" }),
});

type Inputs = z.infer<typeof schema>;

const AnnouncementForm = ({
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
        {type === "update" ? "Update Announcement" : "Add New Announcement"}
      </h1>

      <span className="text-xs text-gray-400 font-medium ">
        Announcement Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
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
          defaultValue={data?.class}
          register={register}
          error={errors?.class}
        />

        <InputField
          label="Date"
          name="date"
          defaultValue={data?.date}
          register={register}
          error={errors?.date}
          type="date"
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
