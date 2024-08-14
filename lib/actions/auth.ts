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
    // Set a cookie with the user info (encrypted in a real app)
    cookies().set(
      "user",
      JSON.stringify({ email: user.email, role: user.role }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      }
    );
    return { success: true };
  } else {
    return { success: false, error: "Invalid credentials" };
  }
}

export async function logout() {
  cookies().delete("user");
}
