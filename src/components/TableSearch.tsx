import Image from "next/image";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 ">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="search..."
        className="w-[200px] bg-transparent outline-none py-2 pr-4 text-lg"
      />
    </div>
  );
};

export default TableSearch;
