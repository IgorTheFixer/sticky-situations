-- CreateEnum
CREATE TYPE "UserStoryStatus" AS ENUM ('NEW', 'OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "UserStory" ADD COLUMN     "status" "UserStoryStatus" NOT NULL DEFAULT 'NEW';
