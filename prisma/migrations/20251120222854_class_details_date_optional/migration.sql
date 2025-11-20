-- AlterTable
ALTER TABLE "class_day_times" ADD COLUMN     "date" TIMESTAMP(3),
ALTER COLUMN "weekday" DROP NOT NULL;
