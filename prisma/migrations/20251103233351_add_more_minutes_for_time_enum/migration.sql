/*
  Warnings:

  - The values [MINUTE_0] on the enum `Minute` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Minute_new" AS ENUM ('MINUTE_00', 'MINUTE_05', 'MINUTE_10', 'MINUTE_15', 'MINUTE_20', 'MINUTE_25', 'MINUTE_30', 'MINUTE_35', 'MINUTE_40', 'MINUTE_45', 'MINUTE_50', 'MINUTE_55');
ALTER TABLE "ClassDayTime" ALTER COLUMN "startMinute" TYPE "Minute_new" USING ("startMinute"::text::"Minute_new");
ALTER TABLE "ClassDayTime" ALTER COLUMN "endMinute" TYPE "Minute_new" USING ("endMinute"::text::"Minute_new");
ALTER TYPE "Minute" RENAME TO "Minute_old";
ALTER TYPE "Minute_new" RENAME TO "Minute";
DROP TYPE "public"."Minute_old";
COMMIT;
