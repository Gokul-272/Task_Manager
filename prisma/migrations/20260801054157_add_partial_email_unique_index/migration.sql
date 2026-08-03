/*
  Warnings:

  - The values [in_progress] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `project_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workspace_members` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId,name]` on the table `boards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('member', 'owner');

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('todo', 'inprogress', 'done');
ALTER TABLE "public"."tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tasks" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "public"."TaskStatus_old";
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'todo';
COMMIT;

-- DropForeignKey
ALTER TABLE "project_members" DROP CONSTRAINT "project_members_addedBy_fkey";

-- DropForeignKey
ALTER TABLE "project_members" DROP CONSTRAINT "project_members_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_members" DROP CONSTRAINT "project_members_userId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_userId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_workspaceId_fkey";

-- DropTable
DROP TABLE "project_members";

-- DropTable
DROP TABLE "workspace_members";

-- CreateTable
CREATE TABLE "workspacemembers" (
    "id" UUID NOT NULL,
    "workspaceId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "role" NOT NULL DEFAULT 'member',

    CONSTRAINT "workspacemembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectmembers" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "addedBy" UUID NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "role" NOT NULL DEFAULT 'member',

    CONSTRAINT "projectmembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workspacemembers_userId_idx" ON "workspacemembers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "workspacemembers_workspaceId_userId_key" ON "workspacemembers"("workspaceId", "userId");

-- CreateIndex
CREATE INDEX "projectmembers_userId_idx" ON "projectmembers"("userId");

-- CreateIndex
CREATE INDEX "projectmembers_addedBy_idx" ON "projectmembers"("addedBy");

-- CreateIndex
CREATE UNIQUE INDEX "projectmembers_projectId_userId_key" ON "projectmembers"("projectId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "boards_projectId_name_key" ON "boards"("projectId", "name");
CREATE UNIQUE INDEX "users_email_active_key" ON "users"("email") WHERE "deletedAt" IS NULL;
-- AddForeignKey
ALTER TABLE "workspacemembers" ADD CONSTRAINT "workspacemembers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKeyc
ALTER TABLE "workspacemembers" ADD CONSTRAINT "workspacemembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectmembers" ADD CONSTRAINT "projectmembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectmembers" ADD CONSTRAINT "projectmembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectmembers" ADD CONSTRAINT "projectmembers_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
