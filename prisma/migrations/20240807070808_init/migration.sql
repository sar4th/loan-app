/*
  Warnings:

  - You are about to drop the column `monthyPayment` on the `PoolDetails` table. All the data in the column will be lost.
  - Added the required column `monthlyPayment` to the `PoolDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PoolDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poolAmount" TEXT NOT NULL,
    "monthlyPayment" TEXT NOT NULL,
    "totalWinners" TEXT NOT NULL,
    "activeUsers" TEXT NOT NULL
);
INSERT INTO "new_PoolDetails" ("activeUsers", "id", "poolAmount", "totalWinners") SELECT "activeUsers", "id", "poolAmount", "totalWinners" FROM "PoolDetails";
DROP TABLE "PoolDetails";
ALTER TABLE "new_PoolDetails" RENAME TO "PoolDetails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
