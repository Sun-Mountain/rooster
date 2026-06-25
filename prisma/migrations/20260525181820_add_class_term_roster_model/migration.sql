/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `class_term_roster` table. All the data in the column will be lost.
  - You are about to drop the `_ClassTermTeachers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dayOfTheWeek` to the `class_term_roster` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClassTermTeachers" DROP CONSTRAINT "_ClassTermTeachers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassTermTeachers" DROP CONSTRAINT "_ClassTermTeachers_B_fkey";

-- DropForeignKey
ALTER TABLE "roster_item" DROP CONSTRAINT "roster_item_classTermRosterId_fkey";

-- DropIndex
DROP INDEX "class_term_details_classId_termId_key";

-- DropIndex
DROP INDEX "class_term_roster_classTermDetailsId_key";

-- DropIndex
DROP INDEX "roster_item_classTermRosterId_userId_key";

-- AlterTable
ALTER TABLE "class_term_roster" DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfTheWeek" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClassTermTeachers";
