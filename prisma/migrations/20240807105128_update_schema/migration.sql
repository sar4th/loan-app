/*
  Warnings:

  - You are about to drop the `Winners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `activeUsers` on the `PoolDetails` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `totalWinners` on the `PoolDetails` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Winners";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Winner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "winDate" DATETIME NOT NULL,
    CONSTRAINT "Winner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PoolDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poolAmount" TEXT,
    "monthlyPayment" TEXT,
    "totalWinners" INTEGER NOT NULL DEFAULT 0,
    "activeUsers" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_PoolDetails" ("activeUsers", "id", "monthlyPayment", "poolAmount", "totalWinners") SELECT coalesce("activeUsers", 0) AS "activeUsers", "id", "monthlyPayment", "poolAmount", coalesce("totalWinners", 0) AS "totalWinners" FROM "PoolDetails";
DROP TABLE "PoolDetails";
ALTER TABLE "new_PoolDetails" RENAME TO "PoolDetails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Winner_userId_key" ON "Winner"("userId");
