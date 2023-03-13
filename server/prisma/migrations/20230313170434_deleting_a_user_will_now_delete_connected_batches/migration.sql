-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_userId_fkey";

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
