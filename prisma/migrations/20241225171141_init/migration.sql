/*
  Warnings:

  - You are about to drop the column `address` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nationalId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bloodGroup` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `digitalAddress` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceAddress` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sickling` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "address",
DROP COLUMN "bloodType",
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "digitalAddress" TEXT NOT NULL,
ADD COLUMN     "healthConditions" TEXT,
ADD COLUMN     "medications" TEXT,
ADD COLUMN     "middleName" TEXT NOT NULL,
ADD COLUMN     "nationalId" TEXT,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "postalAddress" TEXT,
ADD COLUMN     "residenceAddress" TEXT NOT NULL,
ADD COLUMN     "sickling" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_nationalId_key" ON "Teacher"("nationalId");
