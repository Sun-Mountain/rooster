/*
  Warnings:

  - You are about to drop the column `endHour` on the `ClassSessionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `endMinute` on the `ClassSessionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `ClassSessionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `startMinute` on the `ClassSessionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `weekday` on the `ClassSessionDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClassSessionDetails" DROP COLUMN "endHour",
DROP COLUMN "endMinute",
DROP COLUMN "startHour",
DROP COLUMN "startMinute",
DROP COLUMN "weekday";

-- CreateTable
CREATE TABLE "ClassDayTime" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "startHour" "Hour" NOT NULL,
    "startMinute" "Minute" NOT NULL,
    "endHour" "Hour" NOT NULL,
    "endMinute" "Minute" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassDayTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassDayTime" ADD CONSTRAINT "ClassDayTime_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassSessionDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
