-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "prevStageId" INTEGER,
    "allTaskDone" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
