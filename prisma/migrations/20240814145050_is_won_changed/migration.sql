/*
  Warnings:

  - You are about to drop the column `isWon` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isWon",
ADD COLUMN     "iswinned" BOOLEAN NOT NULL DEFAULT false;
