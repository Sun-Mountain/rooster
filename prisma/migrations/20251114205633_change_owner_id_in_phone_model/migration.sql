/*
  Warnings:

  - You are about to drop the column `contactId` on the `Phone` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Phone` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_userId_fkey";

-- DropIndex
DROP INDEX "Phone_contactId_key";

-- DropIndex
DROP INDEX "Phone_userId_key";

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "contactId",
DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Phone_ownerId_key" ON "Phone"("ownerId");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_user_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_emergencyContact_fkey" FOREIGN KEY ("ownerId") REFERENCES "EmergencyContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
