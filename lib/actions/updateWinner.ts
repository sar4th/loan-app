"use server";
import { revalidatePath } from "next/cache";
import prisma from "../db";

export const updateWinner = async (userId: number, isWinner: boolean) => {
  debugger;
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        iswinned: isWinner,
        winDate: new Date(),
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("Error updating winner:", error);
  }
};
