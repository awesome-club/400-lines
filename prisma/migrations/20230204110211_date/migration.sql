/*
  Warnings:

  - You are about to drop the column `effort` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL
);
INSERT INTO "new_Task" ("date", "details", "id", "status", "title") SELECT "date", "details", "id", "status", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
