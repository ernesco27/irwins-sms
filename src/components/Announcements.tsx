const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-irwinSkyLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              01-10-2024
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            sapiente sit, quam, tenetur nesciunt itaque sunt praesentium ipsa d.
          </p>
        </div>
        <div className="bg-irwinPurpleLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              01-10-2024
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            totam maiores officia quis error culpa, alias neque mollitia rerum
            impedit similique saepe.
          </p>
        </div>
        <div className="bg-irwinYellowLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              01-10-2024
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
            laborum et neque impedit, provident sit incidunt{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
