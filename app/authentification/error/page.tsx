"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Error Page</h1>
      <button onClick={() => router.push("/")}>Go Home</button>
    </div>
  );
};

export default ErrorPage;
