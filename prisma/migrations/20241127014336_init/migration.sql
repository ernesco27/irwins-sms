/*
  Warnings:

  - You are about to drop the column `address` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nationalId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumberOfGuardian]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailOfGuardian]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bloodGroup` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `digitalAddress` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullNameOfGuardian` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumberOfGuardian` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationOfGuardian` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceAddress` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "address",
DROP COLUMN "bloodType",
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "digitalAddress" TEXT NOT NULL,
ADD COLUMN     "emailOfGuardian" TEXT,
ADD COLUMN     "fullNameOfGuardian" TEXT NOT NULL,
ADD COLUMN     "healthConditions" TEXT,
ADD COLUMN     "medications" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "nationalId" TEXT,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "phoneNumberOfGuardian" TEXT NOT NULL,
ADD COLUMN     "postalAddress" TEXT,
ADD COLUMN     "relationOfGuardian" TEXT NOT NULL,
ADD COLUMN     "residenceAddress" TEXT NOT NULL,
ADD COLUMN     "vaccineDate" TIMESTAMP(3),
ADD COLUMN     "vaccineDose" TEXT,
ADD COLUMN     "vaccineName" TEXT,
ADD COLUMN     "vaccineType" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_nationalId_key" ON "Student"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phoneNumberOfGuardian_key" ON "Student"("phoneNumberOfGuardian");

-- CreateIndex
CREATE UNIQUE INDEX "Student_emailOfGuardian_key" ON "Student"("emailOfGuardian");
