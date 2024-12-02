-- CreateTable
CREATE TABLE "VacancyInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expectations" TEXT[],
    "tasks" TEXT[],
    "offers" TEXT[],
    "salary" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VacancyInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VacancyInfo" ADD CONSTRAINT "VacancyInfo_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
