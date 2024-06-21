"use client";
import React from "react";
import { LoginForm } from "@/components/loginForm";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function Login() {
  // const router = useRouter();
  // const { data: session } = useSession();

  // if (session) router.push("/");
  return (
    <div
      style={{
        height: "calc(100vh - 112px)",
      }}
      className="flex items-start"
    >
      <LoginForm />
    </div>
  );
}
