-- AlterTable
ALTER TABLE "user" ADD COLUMN     "pronouns" TEXT;

-- CreateTable
CREATE TABLE "contact_address" (
    "id" TEXT NOT NULL,
    "street1" TEXT NOT NULL,
    "street2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'USA',
    "secondEmail" TEXT,
    "phone" TEXT NOT NULL,
    "preferredContact" TEXT NOT NULL DEFAULT 'phone',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_address_userId_key" ON "contact_address"("userId");

-- AddForeignKey
ALTER TABLE "contact_address" ADD CONSTRAINT "contact_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
