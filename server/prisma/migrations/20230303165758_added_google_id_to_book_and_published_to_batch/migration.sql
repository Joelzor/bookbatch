-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "googleId" TEXT;
