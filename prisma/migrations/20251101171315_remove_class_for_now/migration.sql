/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ClassDetails" DROP CONSTRAINT "ClassDetails_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClassDetails" DROP CONSTRAINT "ClassDetails_coachId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Coach" DROP CONSTRAINT "Coach_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ClassToSession" DROP CONSTRAINT "_ClassToSession_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ClassToSession" DROP CONSTRAINT "_ClassToSession_B_fkey";

-- DropTable
DROP TABLE "public"."Class";

-- DropTable
DROP TABLE "public"."ClassDetails";

-- DropTable
DROP TABLE "public"."Coach";

-- DropTable
DROP TABLE "public"."_ClassToSession";
