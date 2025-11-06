/*
  Warnings:

  - You are about to drop the column `endHour` on the `ClassDayTime` table. All the data in the column will be lost.
  - You are about to drop the column `endMinute` on the `ClassDayTime` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `ClassDayTime` table. All the data in the column will be lost.
  - You are about to drop the column `startMinute` on the `ClassDayTime` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `ClassDayTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `ClassDayTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassDayTime" DROP COLUMN "endHour",
DROP COLUMN "endMinute",
DROP COLUMN "startHour",
DROP COLUMN "startMinute",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Hour";

-- DropEnum
DROP TYPE "public"."Minute";
