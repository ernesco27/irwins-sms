import { currentUser } from "@clerk/nextjs/server";

const AdminLayout = async ({
  children,
  users,
  finance,
  event,
  count,
  attendance,
  announcement,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  finance: React.ReactNode;
  event: React.ReactNode;
  count: React.ReactNode;
  attendance: React.ReactNode;
  announcement: React.ReactNode;
}) => {
  const user = await currentUser();

  return (
    <div>
      {/* <div>{children} </div> */}
      <h1 className="p-4 text-2xl font-medium">
        {`Welcome, ${user?.firstName}!`}
      </h1>
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}

        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div>{users}</div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">{count}</div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[450px]">{attendance}</div>
          </div>
          {/* BOTTOM CHARTS */}
          <div className="w-full h-[500px]">{finance}</div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>{event}</div>
          <div>{announcement}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
