/*
  Warnings:

  - You are about to drop the `Winner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_userId_fkey";

-- AlterTable
ALTER TABLE "PoolDetails" ALTER COLUMN "poolAmount" SET DATA TYPE TEXT,
ALTER COLUMN "monthlyPayment" SET DATA TYPE TEXT,
ALTER COLUMN "totalWinners" SET DATA TYPE TEXT,
ALTER COLUMN "activeUsers" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Winner";

-- CreateTable
CREATE TABLE "Winners" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "winDate" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "Winners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Winners_userId_key" ON "Winners"("userId");
