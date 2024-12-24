"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { parentSchema, ParentSchema } from "@/lib/formValidationSchema";
import { useFormState } from "react-dom";
import { createParent, updateParent } from "@/lib/action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ParentForm = ({
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
  } = useForm<ParentSchema>({
    resolver: zodResolver(parentSchema),
  });

  const [state, formAction] = useFormState(
    type == "create" ? createParent : updateParent,
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
      toast(
        `Student ${type === "create" ? "Created" : "updated"} successfully`,
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

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update" ? "Update Parent's Info" : "Add New Parent"}
      </h1>
      <span className="text-xs text-gray-400 font-medium ">
        Authentication Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          //error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          //error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          //error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium ">
        Personal Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          //error={errors?.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          //error={errors?.lastName}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          defaultValue={data?.phoneNumber}
          register={register}
          //error={errors?.phoneNumber}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          //error={errors?.address}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button>
    </form>
  );
};

export default ParentForm;
