-- AlterTable
ALTER TABLE "PoolDetails" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "PoolDetails_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Winners" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Winners_id_seq";
