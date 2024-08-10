"use client";

import React from "react";
import {
  GoogleSignInButton,
  GithubSignInButton,
} from "@/components/signInButtons";
import { SignUpButton } from "@/components/SignUpButton";
import { CredentialsForm } from "@/components/credentialForm";

export default function Page() {
  return (
    <div className="w-full flex items-center min-h-screen p-4 lg:justify-center">
      <div className="w-full max-w-md border-2 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center p-6 shadow-md">
          <h1 className="text-4xl text-gray-400 font-bold">Sign In</h1>
          <GoogleSignInButton />
          <GithubSignInButton />
          <span className="text-2xl text-gray-400 font-semibold text-center mt-8">
            Or
          </span>

          <CredentialsForm />
          <div className="w-full mt-2 block justify-between">
            <SignUpButton />
          </div>
        </div>
      </div>
    </div>
  );
}
