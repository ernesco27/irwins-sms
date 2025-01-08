/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `lessonId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_subjectId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "subjectId",
ADD COLUMN     "lessonId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
