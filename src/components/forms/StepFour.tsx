import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";

const stepFourSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(1, { message: "Full Name is required!" }),
  relation: z.string().min(1, { message: "Relation is required!" }),
  phoneNumber: z.coerce
    .number()
    .min(1, { message: "Phone Number is required!" }),
});

type StepFourSchema = z.infer<typeof stepFourSchema>;

export default function StepFour({ initialData, onNext, onPrevious }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepFourSchema>({
    resolver: zodResolver(stepFourSchema),
    //defaultValues: initialData,
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold mb-4">Step 4: Guardian Details</h2>
      <div className="flex justify-between gap-4 flex-wrap">
        <InputField
          label="Full Name"
          name="fullName"
          defaultValue={initialData?.fullName}
          register={register}
          error={errors?.fullName}
        />
        <InputField
          label="Relation"
          name="relation"
          defaultValue={initialData?.relation}
          register={register}
          error={errors?.relation}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          defaultValue={initialData?.phoneNumber}
          register={register}
          error={errors?.phoneNumber}
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
