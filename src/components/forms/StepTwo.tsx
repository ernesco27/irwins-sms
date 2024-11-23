import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";

const stepTwoSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, { message: "First Name is required!" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  birthDay: z.coerce.date({ message: "Date of Birth is required!" }),
  nationality: z.string().min(1, { message: "Nationality is required!" }),
  nationalId: z.string().min(1, { message: "National ID is required!" }),
  parentId: z.string().min(1, { message: "Parent UID is required!" }),
});

type StepTwoSchema = z.infer<typeof stepTwoSchema>;

export default function StepTwo({ initialData, onNext, onPrevious }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepTwoSchema>({
    resolver: zodResolver(stepTwoSchema),
    //defaultValues: initialData,
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 2: Personal Information</h2>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={initialData?.firstName}
          register={register}
          error={errors?.firstName}
        />
        <InputField
          label="Middle Name"
          name="middleName"
          defaultValue={initialData?.middleName}
          register={register}
          error={errors?.middleName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={initialData?.lastName}
          register={register}
          error={errors?.lastName}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={initialData?.sex}
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
          //defaultValue={initialData?.birthday.toISOString().split("T")[0]}
          register={register}
          error={errors?.birthDay}
          type="date"
        />
        <InputField
          label="Nationality"
          name="nationality"
          defaultValue={initialData?.firstName}
          register={register}
          error={errors?.nationality}
        />
        <InputField
          label="National ID No."
          name="nationalId"
          defaultValue={initialData?.nationalId}
          register={register}
          error={errors?.nationalId}
        />
        <InputField
          label="Parent UId"
          name="parentId"
          defaultValue={initialData?.parentId}
          register={register}
          error={errors.parentId}
        />

        {initialData && (
          <InputField
            label="Id"
            name="id"
            //defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>

      <button
        type="button"
        onClick={onPrevious}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </form>
  );
}
