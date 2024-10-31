import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSessionData } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ResultList = {
  id: number;
  title: string;
  studentFirstName: string;
  studentLastName: string;
  teacherFirstName: string;
  teacherLastName: string;
  score: number;
  className: String;
  startTime: Date;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student's Name",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },

  {
    header: "Date",
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
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student's Name",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },

  {
    header: "Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
];

const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, currentUserId } = await getSessionData();

  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-irwinPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.title}</h3>
      </td>
      <td>{`${item.studentFirstName} ${item.studentLastName}`}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{`${item.teacherLastName} ${item.teacherFirstName}`}</td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-us").format(item.startTime)}
      </td>
      <td>
        {(role === "admin" || role === "teacher") && (
          <div className="flex items-center gap-2">
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item.id} />
          </div>
        )}
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;

          case "search":
            query.OR = [
              {
                exam: {
                  title: { contains: value, mode: "insensitive" },
                },
              },
              {
                student: {
                  firstName: { contains: value, mode: "insensitive" },
                  // lastName: { contains: value, mode: "insensitive" },
                },
              },
            ];
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
      query.OR = [
        {
          exam: { lesson: { teacherId: currentUserId! } },
          assignment: { lesson: { teacherId: currentUserId! } },
        },
      ];
      break;
    case "student":
      query.studentId = currentUserId!;
      break;
    case "parent":
      query.student = {
        parentId: currentUserId!,
      };
      break;

    default:
      break;
  }

  const [dataResponse, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        exam: {
          include: {
            lesson: {
              select: {
                teacher: {
                  select: { firstName: true, lastName: true },
                },
                class: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                teacher: {
                  select: { firstName: true, lastName: true },
                },
                class: { select: { name: true } },
              },
            },
          },
        },
        student: {
          select: { firstName: true, lastName: true },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  const data = dataResponse.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentFirstName: item.student.firstName,
      studentLastName: item.student.lastName,
      teacherFirstName: assessment.lesson.teacher.firstName,
      teacherLastName: assessment.lesson.teacher.lastName,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center  gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow ">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-irwinYellow ">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="result" type="create" />}
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

export default ResultsListPage;
