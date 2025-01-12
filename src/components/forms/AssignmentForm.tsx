"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { assignmentSchema, AssignmentSchema } from "@/lib/formValidationSchema";
import { useFormState } from "react-dom";
import { createAssignment, updateAssignment } from "@/lib/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FileUpload from "../FileUpload";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebaseConfig";

const AssignmentForm = ({
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
  } = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `documents/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        console.log("File available at", url);
      },
    );
  };

  const [state, formAction] = useFormState(
    type == "create" ? createAssignment : updateAssignment,
    {
      success: false,
      error: false,
    },
  );

  const onSubmit = handleSubmit(
    (data) => {
      const completeData = { ...data, file: downloadURL };
      console.log(completeData);
      //formAction(data);
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
        `Assignment ${type === "create" ? "Created" : "updated"} successfully`,
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { assignmentSubjects, assignmentClass, assignmentTeacher } =
    relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "update" ? "Update Assignment" : "Add New Assignment"}
      </h1>

      <span className="text-xs text-gray-400 font-medium ">
        Assignment Information
      </span>
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-lg text-gray-500">Subject Title</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("subjectId")}
              defaultValue={data?.subjectId}
            >
              {assignmentSubjects.map(
                (lesson: { id: number; name: string }) => {
                  return (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.name}
                    </option>
                  );
                },
              )}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-lg text-gray-500">Class</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("classId")}
              defaultValue={data?.classId}
            >
              {assignmentClass.map((classes: { id: number; name: string }) => {
                return (
                  <option key={classes.id} value={classes.id}>
                    {classes.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-lg text-gray-500">Teacher</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("teacherId")}
              defaultValue={data?.teacherId}
            >
              {assignmentTeacher.map(
                (teacher: {
                  id: string;
                  firstName: string;
                  lastName: string;
                }) => {
                  return (
                    <option key={teacher.id} value={teacher.id}>
                      {`${teacher.firstName} ${teacher.lastName}`}
                    </option>
                  );
                },
              )}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-6  mb-6">
          <label className="text-lg text-gray-500">Notes</label>
          <textarea
            defaultValue={data?.notes}
            {...register("notes")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-lg w-full"
          ></textarea>
        </div>

        {/* <FileUpload /> */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <input
            type="file"
            onChange={handleFileChange}
            // {...register("file")}
          />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
          {downloadURL && (
            <p>
              File uploaded successfully! <a href={downloadURL}>View File</a>
            </p>
          )}
        </div>

        <InputField
          label="Due Date"
          name="date"
          defaultValue={data?.date}
          register={register}
          type="date"
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "update"}
      </button>
    </form>
  );
};

export default AssignmentForm;
