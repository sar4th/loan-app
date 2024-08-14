"use server";

import { cookies } from "next/headers";

const users = [
  { email: "admin@admin.com", password: "admin@123", role: "admin" },
  { email: "user@user.com", password: "user@123", role: "user" },
];

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    cookies().set({
      name: "user",
      value: user.role,
      httpOnly: true,
      path: "/",
    });
    return { success: true };
  } else {
    return { success: false, error: "Invalid credentials" };
  }
}

export async function logout() {
  cookies().delete("user");
}
