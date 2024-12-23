/*
  Warnings:

  - The primary key for the `Bug` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserStory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_userStoryId_fkey";

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userStoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserStory" DROP CONSTRAINT "UserStory_featureId_fkey";

-- AlterTable
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userStoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bug_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Bug_id_seq";

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "projectId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Feature_id_seq";

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq";

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userStoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";

-- AlterTable
ALTER TABLE "UserStory" DROP CONSTRAINT "UserStory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "featureId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserStory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserStory_id_seq";

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userStoryId_fkey" FOREIGN KEY ("userStoryId") REFERENCES "UserStory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_userStoryId_fkey" FOREIGN KEY ("userStoryId") REFERENCES "UserStory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
