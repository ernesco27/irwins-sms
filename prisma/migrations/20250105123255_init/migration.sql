/*
  Warnings:

  - You are about to drop the column `lessonId` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tearcherId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "lessonId",
ADD COLUMN     "subjectId" INTEGER NOT NULL,
ADD COLUMN     "tearcherId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_tearcherId_fkey" FOREIGN KEY ("tearcherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
