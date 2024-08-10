"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fonction qui gère la soumission du formulaire
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Réinitialisation des messages d'erreur et de succès
    setError(null);
    setSuccess(null);

    // Envoi des données du formulaire à l'API d'inscription
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Échec de l'inscription");
      }

      setSuccess("Enregistré avec succès 😉");
      setTimeout(() => {
        window.location.href = "/authentification/signin";
      }, 2000);
    } catch (error: any) {
      console.error("Erreur lors de l'inscription :", error.message || error);
      setError(error.message || "Une erreur s'est produite.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
