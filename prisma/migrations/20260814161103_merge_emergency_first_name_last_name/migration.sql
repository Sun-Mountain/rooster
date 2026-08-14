/*
  Warnings:

  - You are about to drop the column `firstName` on the `emergency_contact` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `emergency_contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "emergency_contact" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT;
