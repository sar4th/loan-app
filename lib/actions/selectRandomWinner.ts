"use server";

import prisma from "../db";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
