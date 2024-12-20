import prisma from "@/lib/prisma";
import { getSessionData } from "@/lib/utils";

const DisciplinaryHistory = async () => {
  const { currentUserId, role } = await getSessionData();

  //   const roleConditions = {
  //     teacher: { lessons: { some: { teacherId: currentUserId! } } },
  //     student: { students: { some: { id: currentUserId! } } },
  //     student: { studentId: currentUserId! },
  //     parent: { students: { some: { parentId: currentUserId! } } },
  //   };

  const roleConditions = {
    teacher: { class: { lessons: { some: { teacherId: currentUserId! } } } },
    student: { studentId: currentUserId! },
    parent: { student: { parentId: currentUserId! } },
    admin: { studentId: currentUserId! },
  };

  const data = await prisma.disciplinaryHistory.findMany({
    take: 3,
    orderBy: { incidentDate: "desc" },
    where: {
      OR: [
        { classId: null }, // Include records not tied to a specific class
        roleConditions[role as keyof typeof roleConditions], // Apply role-specific filtering
      ],
    },
    include: {
      student: true, // Optionally include student information
    },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Disciplinary History</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((record, index) => (
            <div
              key={record.id}
              className={`${
                index % 3 === 0
                  ? "bg-irwinSkyLight"
                  : index % 3 === 1
                  ? "bg-irwinPurpleLight"
                  : "bg-irwinYellowLight"
              } rounded-md p-4`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{record.offense}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(record.incidentDate),
                  )}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{record.description}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">
            No disciplinary history found.
          </p>
        )}

        {/* <div className="bg-irwinSkyLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[0]?.title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("en-GB").format(data[0]?.reportDate)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{data[0]?.description}</p>
        </div>
        <div className="bg-irwinPurpleLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[1]?.title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("en-GB").format(data[1]?.reportDate)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{data[1]?.description}</p>
        </div>
        <div className="bg-irwinYellowLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[2]?.title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("en-GB").format(data[2]?.reportDate)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{data[2]?.description}</p>
        </div> */}
      </div>
    </div>
  );
};

export default DisciplinaryHistory;
