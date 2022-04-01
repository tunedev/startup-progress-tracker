-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "name", "updatedAt", "userId") SELECT "createdAt", "description", "id", "name", "updatedAt", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");
CREATE TABLE "new_Stage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "prevStageId" INTEGER,
    "allTaskDone" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stage_prevStageId_fkey" FOREIGN KEY ("prevStageId") REFERENCES "Stage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Stage" ("allTaskDone", "createdAt", "description", "id", "name", "prevStageId", "projectId", "updatedAt") SELECT "allTaskDone", "createdAt", "description", "id", "name", "prevStageId", "projectId", "updatedAt" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
CREATE UNIQUE INDEX "Stage_name_key" ON "Stage"("name");
CREATE UNIQUE INDEX "Stage_prevStageId_key" ON "Stage"("prevStageId");
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "stageId" INTEGER NOT NULL,
    "description" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Task_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "description", "done", "id", "name", "stageId", "updatedAt") SELECT "createdAt", "description", "done", "id", "name", "stageId", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_name_key" ON "Task"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
