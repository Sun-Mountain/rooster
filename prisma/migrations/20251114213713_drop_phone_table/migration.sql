/*
  Warnings:

  - You are about to drop the `phone_numbers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phoneNum` to the `emergency_contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "phone_numbers" DROP CONSTRAINT "Phone_emergencyContact_fkey";

-- DropForeignKey
ALTER TABLE "phone_numbers" DROP CONSTRAINT "Phone_user_fkey";

-- AlterTable
ALTER TABLE "emergency_contacts" ADD COLUMN     "phoneNum" TEXT NOT NULL,
ALTER COLUMN "relationship" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phoneNum" TEXT;

-- DropTable
DROP TABLE "phone_numbers";
