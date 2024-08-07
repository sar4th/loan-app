"use server";

import { PoolDetails } from "@prisma/client";
import prisma from "../db";
import { revalidatePath } from "next/cache";

export const upsertPoolDetails = async (
  data: Partial<Omit<PoolDetails, "id">>
) => {
  const result = await prisma.poolDetails.upsert({
    where: {
      id: 1,
    },
    update: {
      ...(data.poolAmount && { poolAmount: data.poolAmount }),
      ...(data.monthlyPayment && { monthlyPayment: data.monthlyPayment }),
      ...(data.totalWinners && { totalWinners: data.totalWinners }),
      ...(data.activeUsers && { activeUsers: data.activeUsers }),
    },
    create: {
      id: 1,
      poolAmount: data.poolAmount || "",
      monthlyPayment: data.monthlyPayment || "",
      totalWinners: data.totalWinners || "",
      activeUsers: data.activeUsers || "",
    },
  });

  revalidatePath("/dashboard");

  return result;
};
