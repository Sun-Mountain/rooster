-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermSignUp" (
    "id" TEXT NOT NULL,
    "termid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "TermSignUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermTeacher" (
    "id" TEXT NOT NULL,
    "termid" TEXT NOT NULL,
    "classid" TEXT NOT NULL,
    "teacherid" TEXT NOT NULL,

    CONSTRAINT "TermTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentSignup" (
    "id" TEXT NOT NULL,
    "equipmentid" TEXT NOT NULL,
    "reservedTime" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "EquipmentSignup_pkey" PRIMARY KEY ("id")
);
