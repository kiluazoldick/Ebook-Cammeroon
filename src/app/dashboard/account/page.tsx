"use client";

import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/database.types";
import toast, { Toaster } from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiLogOut,
  FiSave,
  FiEdit,
  FiLoader,
  FiStar,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

type UserProfile = {
  id: string;
  email: string | null;
  full_name?: string | null;
  subscription_status?: string | null;
};

export default function ComptePage() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);

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
    if (!session || !name.trim()) return;

    setUpdating(true);

    const { error } = await supabase
      .from("Profile")
      .update({
        full_name: name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id);

    setUpdating(false);

    if (error) {
      toast.error("Erreur lors de la mise à jour");
    } else {
      toast.success("Profil mis à jour !");
      setUser((prev) => (prev ? { ...prev, full_name: name } : null));
      setEditMode(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast("Déconnexion réussie !");
    window.location.href = "/";
  };

  const handleUpgrade = async (plan: string) => {
    try {
      const amount = plan === "Pro" ? 1000 : 2000;
      
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, plan }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.link;
      } else {
        toast.error("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur inattendue :", error);
      toast.error("Une erreur est survenue");
    }
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
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-lg">Chargement du compte...</p>
        </div>
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

  const isPremium = user.subscription_status === "active";

  return (
    <div className="min-h-screen bg-white py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Mon Compte
          </h1>
        </div>

        {/* Section Abonnement */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <FiStar className={isPremium ? "text-yellow-500" : "text-gray-400"} />
              Votre abonnement
            </h3>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-900 font-medium">
                  {isPremium ? "Abonnement Premium" : "Version Gratuite"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {isPremium
                    ? "Vous bénéficiez de tous les avantages Premium"
                    : "Accès limité aux fonctionnalités"}
                </p>
              </div>

              {isPremium ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Actif
                </span>
              ) : (
                <button
                  onClick={() => handleUpgrade("Pro")}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                  Passer à Premium
                </button>
              )}
            </div>

            {!isPremium && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Avantages Premium :
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Accès illimité à tous les ebooks
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Téléchargement hors-ligne
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Recommandations personnalisées
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Section Profil */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md"
                style={{
                  backgroundColor: stringToColor(
                    user.full_name ?? user.email ?? "user"
                  ),
                }}
              >
                {getInitials(user.full_name ?? user.email)}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {user.full_name ?? "Nom non défini"}
                </h2>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                  <FiMail className="text-gray-400" />
                  {user.email ?? "Email non disponible"}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiUser className="text-gray-500" />
                  Informations personnelles
                </h3>

                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <FiEdit size={16} />
                    Modifier
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Nom complet
                  </label>
                  {editMode ? (
                    <input
                      id="fullName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez votre nom complet"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 rounded-lg p-3">
                      {name || "Non renseigné"}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                    <FiMail className="text-gray-400" />
                    {user.email ?? "Email non disponible"}
                  </p>
                </div>
              </div>

              {editMode && (
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={updateProfile}
                    disabled={
                      updating || !name.trim() || name === user.full_name
                    }
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition ${
                      updating || !name.trim() || name === user.full_name
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {updating ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <FiSave />
                        Enregistrer les modifications
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setName(user.full_name ?? "");
                      setEditMode(false);
                    }}
                    className="px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 transition"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Actions du compte
            </h3>

            <div className="space-y-4">
              {isPremium && (
                <button
                  onClick={() => window.location.href = "/tarifs"}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-orange-600 hover:bg-orange-50 border border-orange-200 transition"
                >
                  <FiStar className="text-orange-500" />
                  Gérer mon abonnement
                </button>
              )}
              
              <button
                onClick={signOut}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 border border-red-200 transition"
              >
                <FiLogOut />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Vous utilisez notre application depuis le compte {user.email}</p>
        </div>
      </div>
    </div>
  );
}
