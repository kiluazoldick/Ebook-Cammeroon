"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Database } from "@/lib/database.types";

// Définition du type user incluant les champs personnalisés
type UserProfile = {
  id: string;
  email: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
};

export default function ComptePage() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        console.error("Erreur de récupération de l'utilisateur :", authError);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("id, email, full_name, avatar_url")
        .eq("id", authUser.id)
        .single();

      if (fetchError) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          fetchError
        );
        setUser({
          id: authUser.id,
          email: authUser.email ?? null, // ✅ force le fallback à null
          full_name: null,
          avatar_url: null,
        }); // fallback partiel
      } else {
        setUser(data as UserProfile); // ✅ cast explicite
      }

      setLoading(false);
    };

    fetchUser();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement du compte...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Aucun utilisateur connecté.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        Bienvenue, {user.full_name ?? "Utilisateur"} 👋
      </h2>

      {/* Profil utilisateur */}
      <div className="flex items-center space-x-6 mb-8">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
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
            {user.full_name ?? "Nom non défini"}
          </p>
          <p className="text-gray-600">
            {user.email ?? "Email non disponible"}
          </p>
        </div>
      </div>

      {/* Formulaire de mise à jour */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
          Nom
        </label>
        <input
          id="name"
          type="text"
          defaultValue={user.full_name ?? ""}
          className="w-full text-gray-900 bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          defaultValue={user.email ?? ""}
          className="w-full text-gray-900 bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
          Mettre à jour
        </button>
      </div>
    </div>
  );
}
