"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <div className="ml-auto flex items-center space-x-4">
      <Button
        variant="destructive"
        onClick={() =>
          logout().then(() => {
            router.push("/login");
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
};
export default SignOutButton;
