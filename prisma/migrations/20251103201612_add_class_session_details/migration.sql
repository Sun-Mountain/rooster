-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSessionDetails" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "startHour" "Hour" NOT NULL,
    "startMinute" "Minute" NOT NULL,
    "endHour" "Hour" NOT NULL,
    "endMinute" "Minute" NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassSessionDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassSessionDetails" ADD CONSTRAINT "ClassSessionDetails_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSessionDetails" ADD CONSTRAINT "ClassSessionDetails_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
