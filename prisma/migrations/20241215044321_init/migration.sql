-- CreateTable
CREATE TABLE "DisciplinaryHistory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "incidentLocation" TEXT NOT NULL,
    "incidentType" TEXT NOT NULL,
    "disciplinaryAction" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "classId" INTEGER,

    CONSTRAINT "DisciplinaryHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisciplinaryHistory" ADD CONSTRAINT "DisciplinaryHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplinaryHistory" ADD CONSTRAINT "DisciplinaryHistory_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
