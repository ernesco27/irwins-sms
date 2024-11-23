import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChart from "@/components/CountChart";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendar from "@/components/EventCalendar";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const user = await currentUser();

  return (
    <div>
      <h1 className="p-4 text-2xl font-medium">
        {`Welcome, ${user?.firstName}!`}
      </h1>
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}

        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type="admin" />
            <UserCard type="students" />
            <UserCard type="teachers" />
            <UserCard type="parents" />
          </div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChartContainer />
            </div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChartContainer />
            </div>
          </div>
          {/* BOTTOM CHARTS */}
          <div className="w-full h-[500px]">
            <FinanceChart />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <EventCalendarContainer searchParams={searchParams} />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
