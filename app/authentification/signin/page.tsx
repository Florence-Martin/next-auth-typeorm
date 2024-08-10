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
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSignInButton />
        <GithubSignInButton />
        <span className="text-2xl font-semibold text-white text-center mt-8">
          Or
        </span>
        <CredentialsForm />
        <div className="mt-6">
          <SignUpButton />
        </div>
      </div>
    </div>
  );
}
