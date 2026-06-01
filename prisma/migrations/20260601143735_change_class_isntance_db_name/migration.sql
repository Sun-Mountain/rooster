/*
  Warnings:

  - You are about to drop the `class_term_roster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "class_term_roster" DROP CONSTRAINT "class_term_roster_classTermDetailsId_fkey";

-- DropTable
DROP TABLE "class_term_roster";

-- CreateTable
CREATE TABLE "class_instance" (
    "id" TEXT NOT NULL,
    "classTermDetailsId" TEXT NOT NULL,
    "dayOfTheWeek" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_instance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "class_instance" ADD CONSTRAINT "class_instance_classTermDetailsId_fkey" FOREIGN KEY ("classTermDetailsId") REFERENCES "class_term_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;
