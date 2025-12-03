/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `emergency_contacts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `emergency_contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emergency_contacts" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "emergency_contacts_userId_key" ON "emergency_contacts"("userId");

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
