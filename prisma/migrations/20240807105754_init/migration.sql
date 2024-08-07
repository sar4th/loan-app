/*
  Warnings:

  - You are about to drop the `Winner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Winner_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Winner";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Winners" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "winDate" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PoolDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poolAmount" TEXT,
    "monthlyPayment" TEXT,
    "totalWinners" TEXT,
    "activeUsers" TEXT
);
INSERT INTO "new_PoolDetails" ("activeUsers", "id", "monthlyPayment", "poolAmount", "totalWinners") SELECT "activeUsers", "id", "monthlyPayment", "poolAmount", "totalWinners" FROM "PoolDetails";
DROP TABLE "PoolDetails";
ALTER TABLE "new_PoolDetails" RENAME TO "PoolDetails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
