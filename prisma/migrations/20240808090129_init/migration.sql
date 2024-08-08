/*
  Warnings:

  - Added the required column `userName` to the `Winners` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Winners" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "winDate" DATETIME NOT NULL,
    "userName" TEXT NOT NULL
);
INSERT INTO "new_Winners" ("userId", "winDate") SELECT "userId", "winDate" FROM "Winners";
DROP TABLE "Winners";
ALTER TABLE "new_Winners" RENAME TO "Winners";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
