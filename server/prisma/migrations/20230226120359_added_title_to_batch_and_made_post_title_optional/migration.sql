-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'My batch';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL;
