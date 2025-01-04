"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputField from "../InputField";
import Image from "next/image";
import {
  teacherSchema,
  TeacherSchema,
  teacherStepSchemas,
} from "@/lib/formValidationSchema";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createTeacher, updateTeacher } from "@/lib/action";
import { CldUploadWidget } from "next-cloudinary";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { Divider } from "antd";
import Summary from "./Summary";

const TeacherForm = ({
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
    getValues,
    control,
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });

  const [state, formAction] = useFormState(
    type == "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    },
  );

  const [step, setStep] = useState<any>(1);
  const [img, setImg] = useState<any>();
  const [formData, setFormData] = useState<any>();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleNext = () => {
    const currentValues = getValues();
    const currentSchema =
      teacherStepSchemas[step as keyof typeof teacherStepSchemas] || z.void();
    // if (step === 7) {
    //   return;
    // }

    if (!currentSchema) {
      toast.error("Validation schema for the current step is not defined.");
      return;
    }

    try {
      const parsedValues = currentSchema.parse(currentValues); // Validate step data
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        ...parsedValues,
      }));
      setStep((prev: number) => prev + 1);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message)); // Show validation errors
      }
    }
  };

  const handlePrevious = () => setStep((prev: number) => prev - 1);

  const onSubmit = handleSubmit((data) => {
    const completeData = { ...data, img: img?.secure_url };

    formAction(completeData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `Teacher ${type === "create" ? "Created" : "updated"} successfully`,
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { subjects } = relatedData;

  return (
    <div>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">
          {type === "update" ? "Update Teacher's Info" : "Create New Teacher"}
        </h1>
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Step 1: Authentication Information
            </h2>
            <div className="flex justify-start ml-6 gap-12  flex-wrap">
              <InputField
                label="Username"
                name="username"
                defaultValue={data?.username}
                register={register}
                //error={errors?.username}
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
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Step 2: Personal Information
            </h2>
            <div className="flex justify-start items-center gap-12 flex-wrap ml-6">
              <InputField
                label="First Name"
                name="firstName"
                defaultValue={data?.firstName}
                register={register}
                //error={errors?.firstName}
              />
              <InputField
                label="Middle Name"
                name="middleName"
                defaultValue={data?.middleName}
                register={register}
                //error={errors?.middleName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                defaultValue={data?.lastName}
                register={register}
                //error={errors?.lastName}
              />
              <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-lg text-gray-500">Gender</label>
                <select
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
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
              <InputField
                label="Date of Birth"
                name="birthDay"
                defaultValue={data?.birthday.toISOString().split("T")[0]}
                register={register}
                //error={errors?.birthDay}
                type="date"
              />
              <InputField
                label="Nationality"
                name="nationality"
                defaultValue={data?.nationality}
                register={register}
                //error={errors?.nationality}
              />
              <InputField
                label="National ID No."
                name="nationalId"
                defaultValue={data?.nationalId}
                register={register}
                //error={errors?.nationalId}
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
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Step 3: Contact Details
            </h2>
            <div className="flex justify-between gap-4 flex-wrap">
              <InputField
                label="Phone Number"
                name="phoneNumber"
                defaultValue={data?.phoneNumber}
                register={register}
                //error={errors?.phoneNumber}
              />
              <InputField
                label="Postal Address"
                name="postalAddress"
                defaultValue={data?.postalAddress}
                register={register}
                //error={errors?.postalAddress}
              />
              <InputField
                label="Residence Address"
                name="residenceAddress"
                defaultValue={data?.residenceAddress}
                register={register}
                //error={errors?.residenceAddress}
              />
              <InputField
                label="Digital Address"
                name="digitalAddress"
                defaultValue={data?.digitalAddress}
                register={register}
                //error={errors?.digitalAddress}
              />
              <InputField
                label="Email Address"
                name="email"
                defaultValue={data?.email}
                register={register}
                //error={errors?.email}
              />
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Step 4: Medical History
            </h2>
            <div className="flex justify-between gap-4 flex-wrap">
              <div className="flex justify-between items-center w-full">
                <InputField
                  label="Blood Group"
                  name="bloodGroup"
                  defaultValue={data?.bloodGroup}
                  register={register}
                  //error={errors?.bloodGroup}
                />
                <InputField
                  label="Sickling"
                  name="sickling"
                  defaultValue={data?.sickling}
                  register={register}
                  //error={errors?.bloodGroup}
                />
              </div>

              <Divider style={{ borderColor: "#7cb305" }} orientation="left">
                Allergies
              </Divider>
              <div className="w-full flex flex-wrap gap-6 justify-center mb-8">
                <textarea
                  defaultValue={data?.allergies}
                  {...register("allergies")}
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
                ></textarea>
                {errors.allergies?.message && (
                  <p className="text-xs text-red-400">
                    {errors.allergies.message.toString()}
                  </p>
                )}
              </div>

              <Divider style={{ borderColor: "#7cb305" }} orientation="left">
                Health Conditions
              </Divider>
              <div className="w-full flex flex-wrap gap-6 justify-center mb-8">
                <textarea
                  defaultValue={data?.healthConditions}
                  {...register("healthConditions")}
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
                ></textarea>
                {errors.healthConditions?.message && (
                  <p className="text-xs text-red-400">
                    {errors.healthConditions.message.toString()}
                  </p>
                )}
              </div>

              <Divider style={{ borderColor: "#7cb305" }} orientation="left">
                Medications
              </Divider>
              <div className="w-full flex flex-wrap gap-6 justify-center mb-8">
                <textarea
                  defaultValue={data?.medications}
                  {...register("medications")}
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
                ></textarea>
                {errors.medications?.message && (
                  <p className="text-xs text-red-400">
                    {errors.medications.message.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 5 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Step 5: Teacher's Photo & Subject
            </h2>
            <div className="flex gap-4 justify-between  ">
              <div className=" flex flex-col gap-4 justify-center items-center w-[40%]">
                <div className="w-44 h-44 rounded-full bg-slate-500 overflow-hidden ">
                  <Image
                    src={img?.secure_url || "/noAvatar.png"}
                    alt=""
                    width={205}
                    height={205}
                  />
                </div>
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
                        <Image
                          src="/upload.png"
                          alt=""
                          width={28}
                          height={28}
                        />
                        <span>Upload a photo</span>
                      </div>
                    );
                  }}
                </CldUploadWidget>
                {errors.img?.message && (
                  <p className="text-xs text-red-400">
                    {errors.img.message.toString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-sm text-gray-500">
                  Subject(s) Taught
                </label>
                <select
                  multiple
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register("subjects")}
                  defaultValue={data?.subjects}
                >
                  {subjects.map((subject: { id: number; name: string }) => (
                    <option value={subject.name} key={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                {errors.subjects?.message && (
                  <p className="text-xs text-red-400">
                    {errors.subjects.message.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 6 && <Summary formData={formData} img={img} />}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-400 text-white p-2 rounded-md"
              onClick={handlePrevious}
            >
              Back
            </button>
          )}
          {step >= 1 && step < 6 && (
            <button
              type="button"
              className="bg-blue-400 text-white p-2 rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
        {step === 6 && (
          <button
            type="submit"
            className="bg-green-400 text-white p-2 rounded-md"
          >
            {type === "create" ? "Create" : "Update"}
          </button>
        )}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default TeacherForm;
