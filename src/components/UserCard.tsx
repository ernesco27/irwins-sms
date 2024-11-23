import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teachers" | "parents" | "students" | "lessons" | "classes";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teachers: prisma.teacher,
    parents: prisma.parent,
    students: prisma.student,
    lessons: prisma.lesson,
    classes: prisma.class,
  };

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-irwinPurple even:bg-irwinYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCard;
