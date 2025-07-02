"use client";

import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/database.types";
import toast, { Toaster } from "react-hot-toast";

type UserProfile = {
  id: string;
  email: string | null;
  full_name?: string | null;
};

export default function ComptePage() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!session) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("Profile")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setUser(data);
        setName(data.full_name ?? "");
      } else {
        console.error("Erreur récupération profil :", error);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [session, supabase]);

  const updateProfile = async () => {
    if (!session) return;

    const { error } = await supabase
      .from("Profile")
      .update({
        full_name: name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id);

    if (error) {
      toast.error("Erreur lors de la mise à jour");
    } else {
      toast.success("Profil mis à jour !");
      setUser((prev) => (prev ? { ...prev, full_name: name } : null));
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast("Déconnexion réussie !");
    window.location.href = "/";
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 60%, 70%)`;
  };

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
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-900">
          Bienvenue, {user.full_name ?? user.email ?? "Utilisateur"} 👋
        </h2>
      </div>

      {/* Avatar (initiales dynamiques) */}
      <div className="flex items-center space-x-6 mb-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
          style={{
            backgroundColor: stringToColor(
              user.full_name ?? user.email ?? "user"
            ),
          }}
        >
          {getInitials(user.full_name ?? user.email)}
        </div>

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
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Nom complet
          </label>
          <input
            id="fullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-gray-900 bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email ?? ""}
            disabled
            className="w-full text-gray-600 bg-gray-100 p-3 rounded-md cursor-not-allowed"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={updateProfile}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Mettre à jour le profil
          </button>

          <button
            onClick={signOut}
            className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
