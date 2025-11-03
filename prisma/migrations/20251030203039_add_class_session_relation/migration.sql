-- CreateTable
CREATE TABLE "_ClassToSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassToSession_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClassToSession_B_index" ON "_ClassToSession"("B");

-- AddForeignKey
ALTER TABLE "_ClassToSession" ADD CONSTRAINT "_ClassToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToSession" ADD CONSTRAINT "_ClassToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
