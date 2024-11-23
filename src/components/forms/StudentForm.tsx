"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { StudentSchema, studentSchema } from "@/lib/formValidationSchema";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createStudent, updateStudent } from "@/lib/action";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const StudentForm = ({
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
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [state, formAction] = useFormState(
    type == "create" ? createStudent : updateStudent,
    {
      success: false,
      error: false,
    },
  );
  const [img, setImg] = useState<any>();
  const [step, setStep] = useState<any>(5);
  const [formData, setFormData] = useState(data || {});

  const handleNext = (stepData: any) => {
    setFormData((prev: any) => ({ ...prev, ...stepData }));
    setStep((prev: number) => prev + 1);
  };

  const handlePrevious = () => setStep((prev: number) => prev - 1);

  const onSubmit = handleSubmit((data) => {
    formAction({ ...data, img: img?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `Student ${type === "create" ? "Created" : "updated"} successfully`,
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { classes, grades } = relatedData;

  return (
    <div className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-2xl font-semibold">
        {type === "update" ? "Update Student's Info" : "Add New Student"}
      </h1>
      {step === 1 && <StepOne initialData={formData} onNext={handleNext} />}
      {step === 2 && (
        <StepTwo
          initialData={formData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <StepThree
          initialData={formData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          relatedData={relatedData}
        />
      )}
      {step === 4 && (
        <StepFour
          initialData={formData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          relatedData={relatedData}
        />
      )}
      {step === 5 && (
        <StepFive
          initialData={formData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          relatedData={relatedData}
        />
      )}
      {/* <span className="text-xs text-gray-400 font-medium ">
        Authentication Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium ">
        Personal Information
      </span>
      <CldUploadWidget
        uploadPreset="school"
        onSuccess={(result, widget) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div
              className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
              onClick={() => open()}
            >
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload a photo</span>
            </div>
          );
        }}
      </CldUploadWidget>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors?.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors?.lastName}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          defaultValue={data?.phoneNumber}
          register={register}
          error={errors?.phoneNumber}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors?.bloodType}
        />
        <InputField
          label="Date of Birth"
          name="birthDay"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          register={register}
          error={errors?.birthDay}
          type="date"
        />
        <InputField
          label="Parent Id"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors.parentId}
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
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: number; level: number }) => (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map(
              (classItem: {
                id: number;
                name: string;
                capacity: number;
                _count: { students: number };
              }) => (
                <option value={classItem.id} key={classItem.id}>
                  {classItem.name} -{" "}
                  {`${classItem._count.students}/${classItem.capacity} Capacity`}
                </option>
              ),
            )}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div> */}

      {/* <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button> */}
    </div>
  );
};

export default StudentForm;
