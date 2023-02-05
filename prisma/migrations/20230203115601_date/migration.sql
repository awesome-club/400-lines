/*
  Warnings:

  - Added the required column `date` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "effort" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "date" INTEGER NOT NULL
);
INSERT INTO "new_Task" ("details", "effort", "id", "status", "title") SELECT "details", "effort", "id", "status", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
