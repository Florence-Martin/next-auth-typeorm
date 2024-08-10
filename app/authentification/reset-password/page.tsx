"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage(
          "Un email de réinitialisation a été envoyé à votre adresse."
        );
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || "Une erreur est survenue.");
        setMessage(null);
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
      setMessage(null);
    }
  };

  return (
    <div className="w-full flex items-center min-h-screen p-4 lg:justify-center">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl text-gray-400 font-bold text-center">
            Réinitialiser le mot de passe
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <div className="p-4 text-green-700 bg-green-100 rounded-md">
                {message}
              </div>
            )}
            {error && (
              <div className="p-4 text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-gray-400 text-sm font-medium"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 text-gray-800 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse email"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Envoyer le lien de réinitialisation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
