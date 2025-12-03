/*
  Warnings:

  - You are about to drop the column `preferredContactMethod` on the `contact_info` table. All the data in the column will be lost.
  - Added the required column `email2` to the `contact_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredContact` to the `contact_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_info" DROP COLUMN "preferredContactMethod",
ADD COLUMN     "email2" TEXT NOT NULL,
ADD COLUMN     "preferredContact" "Contact" NOT NULL;
