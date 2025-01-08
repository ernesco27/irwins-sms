/*
  Warnings:

  - You are about to drop the column `tearcherId` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_tearcherId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "tearcherId",
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
