import Announcements from "@/components/Announcements";

import BigCalendarContainer from "@/components/BigCalendarContainer";

import EventCalendarContainer from "@/components/EventCalendarContainer";
import UserCard from "@/components/UserCard";
import { getSessionData } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

const TeacherPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { currentUserId } = await getSessionData();
  const user = await currentUser();

  return (
    <div>
      <h1 className="p-4 text-2xl font-medium">
        {`Welcome, ${user?.firstName}!`}
      </h1>

      <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}

        <div className="w-full xl:w-2/3">
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type="classes" />
            <UserCard type="lessons" />
            <UserCard type="students" />
          </div>
          <div className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Schedule</h1>
            <BigCalendarContainer type="teacherId" id={currentUserId!} />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-8">
          <EventCalendarContainer searchParams={searchParams} />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
