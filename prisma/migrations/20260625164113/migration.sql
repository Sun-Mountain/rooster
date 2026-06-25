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

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
