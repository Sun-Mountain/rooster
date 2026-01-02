/*
  Warnings:

  - You are about to drop the column `secondEmail` on the `contact_address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contact_address" DROP COLUMN "secondEmail",
ADD COLUMN     "secondaryEmail" TEXT;
