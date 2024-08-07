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
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
