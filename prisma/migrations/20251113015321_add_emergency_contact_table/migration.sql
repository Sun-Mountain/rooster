/*
  Warnings:

  - A unique constraint covering the columns `[contactId]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Phone" ADD COLUMN     "contactId" TEXT;

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL DEFAULT 'e-${cuid()}',
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_userId_key" ON "EmergencyContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_contactId_key" ON "Phone"("contactId");

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "EmergencyContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
