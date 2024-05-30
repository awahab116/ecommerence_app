"use client";
import React from "react";
import { LoginForm } from "@/components/loginForm";

export default function Login() {
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
