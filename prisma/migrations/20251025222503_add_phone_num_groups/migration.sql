/*
  Warnings:

  - You are about to drop the column `number` on the `PhoneNumber` table. All the data in the column will be lost.
  - Added the required column `areaCode` to the `PhoneNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberGrp1` to the `PhoneNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberGrp2` to the `PhoneNumber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhoneNumber" DROP COLUMN "number",
ADD COLUMN     "areaCode" TEXT NOT NULL,
ADD COLUMN     "numberGrp1" TEXT NOT NULL,
ADD COLUMN     "numberGrp2" TEXT NOT NULL;
