"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ClientPageProps {
  initialUser: any | null;
}

export default function ClientPage({ initialUser }: ClientPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [initialUser, router]);

  return null;
}
