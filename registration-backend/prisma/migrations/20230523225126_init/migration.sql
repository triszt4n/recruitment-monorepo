-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "authSchId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "inviteId" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "nickName" TEXT,
    "dormRoom" TEXT,
    "neptunCode" TEXT NOT NULL,
    "universityFaculty" TEXT NOT NULL,
    "programmeName" TEXT,
    "programmeLevel" TEXT,
    "programmeStartSemester" TEXT,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authSchId_key" ON "User"("authSchId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
