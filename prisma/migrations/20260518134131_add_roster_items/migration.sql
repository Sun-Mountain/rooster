/*
  Warnings:

  - You are about to drop the column `dayOfTheWeek` on the `class_term_details` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `class_term_details` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `class_term_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "class_term_details" DROP COLUMN "dayOfTheWeek",
DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- CreateTable
CREATE TABLE "class_teacher_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teacherName" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_teacher_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_term_roster" (
    "id" TEXT NOT NULL,
    "classTermDetailsId" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_term_roster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roster_item" (
    "id" TEXT NOT NULL,
    "classTermRosterId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roster_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassTermTeachers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassTermTeachers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_teacher_profile_userId_key" ON "class_teacher_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "class_term_roster_classTermDetailsId_key" ON "class_term_roster"("classTermDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "roster_item_classTermRosterId_userId_key" ON "roster_item"("classTermRosterId", "userId");

-- CreateIndex
CREATE INDEX "_ClassTermTeachers_B_index" ON "_ClassTermTeachers"("B");

-- AddForeignKey
ALTER TABLE "class_teacher_profile" ADD CONSTRAINT "class_teacher_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_term_roster" ADD CONSTRAINT "class_term_roster_classTermDetailsId_fkey" FOREIGN KEY ("classTermDetailsId") REFERENCES "class_term_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roster_item" ADD CONSTRAINT "roster_item_classTermRosterId_fkey" FOREIGN KEY ("classTermRosterId") REFERENCES "class_term_roster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roster_item" ADD CONSTRAINT "roster_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassTermTeachers" ADD CONSTRAINT "_ClassTermTeachers_A_fkey" FOREIGN KEY ("A") REFERENCES "class_teacher_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassTermTeachers" ADD CONSTRAINT "_ClassTermTeachers_B_fkey" FOREIGN KEY ("B") REFERENCES "class_term_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;
