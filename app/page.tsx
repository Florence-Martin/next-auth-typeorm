"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/authentification/signin");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mt-10 mb-4 text-4xl font-bold">
        Welcome to BegginnersAppDev
      </h1>
      <button
        onClick={handleSignIn}
        className="w-50 flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
      >
        Sign In
      </button>
    </div>
  );
}
