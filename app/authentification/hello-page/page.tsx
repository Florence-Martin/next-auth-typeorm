"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HelloPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    setIsLoading(true);
    router.push("/authentification/signin");
  };

  return (
    <div className="w-full flex items-center min-h-screen p-4 lg:justify-center">
      <div className="w-full max-w-md border-2 rounded-lg shadow-lg p-6">
        <h1 className="text-lime-200 text-lg">
          Hello, welcome to the protected page!
        </h1>
        <button
              onClick={() => signOut({ callbackUrl: "/authentification/signin"})}
              className={`w-50 flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 ${
                isLoading ? "bg-gray-200" : "bg-white"
              } border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Out"}
            </button>


      </div>
    </div>
  );
}
