import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import DisciplinaryHistory from "@/components/DisciplinaryHistory";
import EventCalendar from "@/components/EventCalendar";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import prisma from "@/lib/prisma";
import { getSessionData } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

const ParentPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { currentUserId } = await getSessionData();
  const user = await currentUser();

  const wards = await prisma.student.findMany({
    where: {
      parent: {
        id: currentUserId!,
      },
    },
  });

  return (
    <div>
      <h1 className="p-4 text-2xl font-medium">
        {`Welcome, ${user?.firstName}!`}
      </h1>
      <div className="p-4 flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3 flex flex-col gap-8">
          {wards.map((ward) => (
            <div key={ward.id} className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">{`Time Table (${ward.firstName} ${ward.middleName} ${ward.lastName})`}</h1>
              <BigCalendarContainer type="classId" id={ward.classId} />
            </div>
          ))}
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-8">
          <EventCalendarContainer searchParams={searchParams} />
          <Announcements />
          <DisciplinaryHistory />
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
