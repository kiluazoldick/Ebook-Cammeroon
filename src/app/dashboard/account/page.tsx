"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ComptePage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement du compte...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        Bienvenue, {session.user.name} 👋
      </h2>

      {/* Profil utilisateur */}
      <div className="flex items-center space-x-6 mb-8">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt="Photo de profil"
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
            ?
          </div>
        )}

        <div>
          <p className="text-lg font-semibold text-gray-900">
            {session.user.name}
          </p>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>

      {/* Formulaire de mise à jour du compte (exemple) */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
          Nom
        </label>
        <input
          id="name"
          type="text"
          defaultValue={session.user.name || ""}
          className="w-full text-gray-900 bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label
          className="block text-gray-700 font-medium mb-1 mt-4"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          defaultValue={session.user.email || ""}
          className="w-full text-gray-900 bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled
        />

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
          Mettre à jour
        </button>
      </div>
    </div>
  );
}
