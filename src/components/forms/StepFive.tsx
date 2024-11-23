import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "antd";
import Image from "next/image";

const stepFiveSchema = z.object({
  id: z.string().optional(),
  vaccineName: z.string().min(1, { message: "Name of Vaccine required!" }),
  vaccineType: z.string().min(1, { message: "Type of Vaccine required!" }),
  vaccineDose: z.string().min(1, { message: "Dose of Vaccine required!" }),
  date: z.coerce.date({ message: "Date of Immunization is required!" }),
});

type StepFiveSchema = z.infer<typeof stepFiveSchema>;

export default function StepFive({ initialData, onNext, onPrevious }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepFiveSchema>({
    resolver: zodResolver(stepFiveSchema),
    //defaultValues: initialData,
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold mb-4">Step 5: Medical History</h2>
      <div className="flex justify-between gap-4 flex-wrap">
        <Divider style={{ borderColor: "#7cb305" }} orientation="left">
          Immunization Records
        </Divider>
        <div className="flex flex-col  justify-center items-center w-full">
          <div className="w-full flex flex-wrap gap-12 justify-center mb-8">
            <InputField
              label="Vaccine Name"
              name="vaccineName"
              defaultValue={initialData?.vaccineName}
              register={register}
              error={errors?.vaccineName}
            />
            <InputField
              label="Vaccine Type"
              name="vaccineType"
              defaultValue={initialData?.vaccineType}
              register={register}
              error={errors?.vaccineType}
            />
            <InputField
              label="Vaccine Dose"
              name="vaccineDose"
              defaultValue={initialData?.vaccineDose}
              register={register}
              error={errors?.vaccineDose}
            />
            <InputField
              label="Date Administered"
              name="date"
              //defaultValue={initialData?.birthday.toISOString().split("T")[0]}
              register={register}
              error={errors?.date}
              type="date"
            />
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow hover:bg-irwinYellowLight "
            onClick={() => {}}
          >
            <Image src={`/create.png`} alt="" width={16} height={16} />
          </button>
        </div>
        <Divider style={{ borderColor: "#7cb305" }} orientation="left">
          Allergies
        </Divider>
        <div className="flex flex-row justify-center items-center w-full">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow hover:bg-irwinYellowLight "
            onClick={() => {}}
          >
            <Image src={`/create.png`} alt="" width={16} height={16} />
          </button>
        </div>
        <Divider style={{ borderColor: "#7cb305" }} orientation="left">
          Health Conditions
        </Divider>
        <div className="flex flex-row justify-center items-center w-full">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow hover:bg-irwinYellowLight "
            onClick={() => {}}
          >
            <Image src={`/create.png`} alt="" width={16} height={16} />
          </button>
        </div>
        <Divider style={{ borderColor: "#7cb305" }} orientation="left">
          Medications
        </Divider>
        <div className="flex flex-row justify-center items-center w-full">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow hover:bg-irwinYellowLight "
            onClick={() => {}}
          >
            <Image src={`/create.png`} alt="" width={16} height={16} />
          </button>
        </div>
        {/* <InputField
          label="Phone Number"
          name="phoneNumber"
          defaultValue={initialData?.phoneNumber}
          register={register}
          error={errors?.phoneNumber}
        />
        <InputField
          label="Postal Address"
          name="postalAddress"
          defaultValue={initialData?.postalAddress}
          register={register}
          error={errors?.postalAddress}
        />
        <InputField
          label="Residence Address"
          name="residenceAddress"
          defaultValue={initialData?.residenceAddress}
          register={register}
          error={errors?.residenceAddress}
        />
        <InputField
          label="Digital Address"
          name="digitalAddress"
          defaultValue={initialData?.digitalAddress}
          register={register}
          error={errors?.digitalAddress}
        />
        <InputField
          label="Email Address"
          name="emailAddress"
          defaultValue={initialData?.emailAddress}
          register={register}
          error={errors?.emailAddress}
        /> */}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-8 text-lg hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-8 text-lg hover:bg-blue-400"
        >
          Next
        </button>
      </div>
    </form>
  );
}
