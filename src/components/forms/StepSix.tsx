import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { Divider } from "antd";

const stepSixSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(1, { message: "Full Name is required!" }),
  relation: z.string().min(1, { message: "Relation is required!" }),
  phoneNumber: z.coerce
    .number()
    .min(1, { message: "Phone Number is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
});

type StepSixSchema = z.infer<typeof stepSixSchema>;

export default function StepSix({
  initialData,
  onNext,
  onPrevious,
  relatedData,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepSixSchema>({
    resolver: zodResolver(stepSixSchema),
    //defaultValues: initialData,
  });

  const [img, setImg] = useState<any>();

  const onSubmit = (data: any) => {
    onNext(data);
  };

  const { classes, grades } = relatedData;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold mb-4">Step 6: Student's Photo</h2>
      <div className="flex justify-between  gap-4 ">
        <div className="flex flex-col gap-4 justify-center items-center">
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
              console.log(result.info);
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
        </div>
        <Divider type="vertical" style={{ borderColor: "#7cb305" }} />
        <div className="w-full">
          <h2>Enrol In?</h2>
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Grade</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("gradeId")}
              defaultValue={initialData?.gradeId}
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
              defaultValue={initialData?.classId}
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
        </div>
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
