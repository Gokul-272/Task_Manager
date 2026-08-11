/*
  Warnings:

  - You are about to drop the column `status` on the `tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId,userId,deletedAt]` on the table `projectmembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workspaceId,name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[columnId,position]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `columnId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "boards_createdBy_idx";

-- DropIndex
DROP INDEX "boards_deletedAt_idx";

-- DropIndex
DROP INDEX "projectmembers_addedBy_idx";

-- DropIndex
DROP INDEX "projectmembers_projectId_userId_key";

-- DropIndex
DROP INDEX "projectmembers_userId_idx";

-- DropIndex
DROP INDEX "projects_createdBy_idx";

-- DropIndex
DROP INDEX "projects_deletedAt_idx";

-- DropIndex
DROP INDEX "projects_workspaceId_idx";

-- DropIndex
DROP INDEX "tasks_assignedTo_idx";

-- DropIndex
DROP INDEX "tasks_boardId_status_idx";

-- DropIndex
DROP INDEX "tasks_boardId_status_position_idx";

-- DropIndex
DROP INDEX "tasks_createdBy_idx";

-- DropIndex
DROP INDEX "tasks_deletedAt_idx";

-- DropIndex
DROP INDEX "tasks_status_idx";

-- DropIndex
DROP INDEX "users_deletedAt_idx";

-- DropIndex
DROP INDEX "workspaceinvites_invitedBy_idx";

-- DropIndex
DROP INDEX "workspaceinvites_invitedUser_idx";

-- DropIndex
DROP INDEX "workspaceinvites_status_idx";

-- AlterTable
ALTER TABLE "projectmembers" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "status",
ADD COLUMN     "columnId" UUID NOT NULL;

-- DropEnum
DROP TYPE "TaskStatus";

-- CreateTable
CREATE TABLE "boardcolumns" (
    "id" UUID NOT NULL,
    "boardId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boardcolumns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "boardcolumns_boardId_idx" ON "boardcolumns"("boardId");

-- CreateIndex
CREATE UNIQUE INDEX "boardcolumns_boardId_name_key" ON "boardcolumns"("boardId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "projectmembers_projectId_userId_deletedAt_key" ON "projectmembers"("projectId", "userId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "projects_workspaceId_name_key" ON "projects"("workspaceId", "name");

-- CreateIndex
CREATE INDEX "tasks_columnId_idx" ON "tasks"("columnId");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_columnId_position_key" ON "tasks"("columnId", "position");

-- AddForeignKey
ALTER TABLE "boardcolumns" ADD CONSTRAINT "boardcolumns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "boardcolumns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
