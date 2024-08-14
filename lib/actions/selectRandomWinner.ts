"use server";

import { User } from "@prisma/client";
import prisma from "../db";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

// export const updatedWinner = async (winner: User) => {
//   try {
//     await prisma.winners.create({
//       data: {
//         userId: winner.id || 0,
//         winDate: new Date(),
//         userName: winner.name,
//       },
//     });
//     revalidatePath("/dashboard");
//   } catch (error) {
//     console.error("Error updating winner:", error);
//   }
// };
