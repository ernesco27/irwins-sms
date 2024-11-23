import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";

const stepThreeSchema = z.object({
  id: z.string().optional(),
  phoneNumber: z.string().optional(),
  postalAddress: z.string().optional(),
  emailAddress: z.string().optional(),
  residenceAddress: z
    .string()
    .min(1, { message: "Residence Address is required!" }),
  digitalAddress: z
    .string()
    .min(1, { message: "Digital Address is required!" }),
});

type StepThreeSchema = z.infer<typeof stepThreeSchema>;

export default function StepThree({ initialData, onNext, onPrevious }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepThreeSchema>({
    resolver: zodResolver(stepThreeSchema),
    //defaultValues: initialData,
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold mb-4">Step 3: Contact Details</h2>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
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
        />
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
