/*
  Warnings:

  - You are about to drop the column `vaccineDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `vaccineDose` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `vaccineName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `vaccineType` on the `Student` table. All the data in the column will be lost.
  - Added the required column `immunizationRecords` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sickling` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "vaccineDate",
DROP COLUMN "vaccineDose",
DROP COLUMN "vaccineName",
DROP COLUMN "vaccineType",
ADD COLUMN     "immunizationRecords" JSONB NOT NULL,
ADD COLUMN     "sickling" TEXT NOT NULL;
