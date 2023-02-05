-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "effort" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);
