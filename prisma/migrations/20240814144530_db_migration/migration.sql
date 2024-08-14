-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isWon" BOOLEAN NOT NULL DEFAULT false,
    "winDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoolDetails" (
    "id" SERIAL NOT NULL,
    "poolAmount" DOUBLE PRECISION,
    "monthlyPayment" DOUBLE PRECISION,
    "totalWinners" INTEGER,
    "activeUsers" INTEGER,

    CONSTRAINT "PoolDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "winDate" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
