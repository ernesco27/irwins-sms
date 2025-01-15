import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getSessionData } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type AssignmentList = Assignment & {
  class: Class;
  subject: Subject;
  teacher: Teacher;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },

  {
    header: "Due Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },

  {
    header: "Actions",
    accessor: "actions",
  },
];

const columnsNon = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },

  {
    header: "Due Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
];

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, currentUserId } = await getSessionData();

  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-irwinPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.subject.name}</h3>
      </td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">{`${item.teacher.firstName} ${item.teacher.lastName}`}</td>
      <td className="hidden md:table-cell">
        {" "}
        {new Intl.DateTimeFormat("en-us").format(item.date)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/assignments/${item.id}`}>
            <button className="flex w-7 h-7 items-center justify-center rounded-full bg-irwinSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {(role === "admin" || role === "teacher") && (
            <FormContainer table="assignment" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.AssignmentWhereInput = {};
  query.class = {};
  query.subject = {};
  query.teacher = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "search":
            query.subject = {
              name: { contains: value, mode: "insensitive" },
            };

            break;
          default:
            break;
        }
      }
    }
  }

  //ROLE CONDITIONS
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.teacherId = currentUserId!;
      break;
    case "student":
      query.class = {
        students: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    case "parent":
      query.class = {
        students: {
          some: {
            parentId: currentUserId!,
          },
        },
      };
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        // lesson: {
        //   select: {
        //     subject: { select: { name: true } },
        //     teacher: { select: { firstName: true, lastName: true } },
        //     class: { select: { name: true } },
        //   },
        // },
        subject: {
          select: {
            name: true,
          },
        },
        class: {
          select: {
            name: true,
          },
        },
        teacher: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center  gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow ">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow ">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>
      {/*LIST */}
      <div className="">
        <Table
          columns={
            role === "admin" || role === "teacher" ? columns : columnsNon
          }
          renderRow={renderRow}
          data={data}
        />
      </div>
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssignmentListPage;
