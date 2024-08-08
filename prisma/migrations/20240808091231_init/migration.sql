/*
  Warnings:

  - The primary key for the `Winners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Winners` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Winners" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "winDate" DATETIME NOT NULL,
    "userName" TEXT NOT NULL
);
INSERT INTO "new_Winners" ("userId", "userName", "winDate") SELECT "userId", "userName", "winDate" FROM "Winners";
DROP TABLE "Winners";
ALTER TABLE "new_Winners" RENAME TO "Winners";
CREATE UNIQUE INDEX "Winners_userId_key" ON "Winners"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
