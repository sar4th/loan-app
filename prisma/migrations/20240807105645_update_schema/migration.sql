-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PoolDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poolAmount" TEXT,
    "monthlyPayment" TEXT,
    "totalWinners" TEXT,
    "activeUsers" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_PoolDetails" ("activeUsers", "id", "monthlyPayment", "poolAmount", "totalWinners") SELECT "activeUsers", "id", "monthlyPayment", "poolAmount", "totalWinners" FROM "PoolDetails";
DROP TABLE "PoolDetails";
ALTER TABLE "new_PoolDetails" RENAME TO "PoolDetails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
