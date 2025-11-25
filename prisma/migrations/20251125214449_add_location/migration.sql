/*
  Warnings:

  - Added the required column `location` to the `class_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class_details" ADD COLUMN     "location" TEXT NOT NULL;
