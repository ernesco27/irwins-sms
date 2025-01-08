/*
  Warnings:

  - You are about to drop the column `title` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "title",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
