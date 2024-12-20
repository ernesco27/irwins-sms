/*
  Warnings:

  - You are about to drop the column `incidentType` on the `DisciplinaryHistory` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `DisciplinaryHistory` table. All the data in the column will be lost.
  - Added the required column `offense` to the `DisciplinaryHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DisciplinaryHistory" DROP COLUMN "incidentType",
DROP COLUMN "title",
ADD COLUMN     "offense" TEXT NOT NULL;
