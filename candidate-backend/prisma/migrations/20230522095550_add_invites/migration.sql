-- CreateTable
CREATE TABLE "Invite" (
    "id" SERIAL NOT NULL,
    "supposedEmail" TEXT NOT NULL,
    "supposedLastName" TEXT NOT NULL,
    "supposedFirstName" TEXT NOT NULL,
    "isEmailSent" BOOLEAN NOT NULL DEFAULT false,
    "communities" TEXT[],
    "periodId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
