import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";

const stepOneSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(10, { message: "Username must be at most 10 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
});

type StepOneSchema = z.infer<typeof stepOneSchema>;

export default function StepOne({ initialData, onNext }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneSchema>({
    resolver: zodResolver(stepOneSchema),
    //defaultValues: initialData,
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold mb-4">
        Step 1: Authentication Information
      </h2>
      <div className="flex justify-start ml-6 gap-12  flex-wrap">
        <InputField
          label="Username"
          name="username"
          defaultValue={initialData?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={initialData?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={initialData?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-8 text-lg hover:bg-blue-400"
      >
        Next
      </button>
    </form>
  );
}
