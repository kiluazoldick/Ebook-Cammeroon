"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!termsAccepted) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/dashboard"
            : "https://ebookcameroun.com/dashboard",
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg(
        "Inscription réussie ! Veuillez vérifier votre email pour valider votre compte."
      );
      setFullName("");
      setEmail("");
      setPassword("");
      setTermsAccepted(false);
      setTimeout(() => router.push("/auth/connexion"), 5000);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setGoogleLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/dashboard"
            : "https://ebookcameroun.com/dashboard",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      setError(`Erreur Google: ${error.message}`);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-orange-700 via-orange-500 to-yellow-400 p-12 text-white flex-col justify-center">
        <div className="mb-10">
          <Link href="/" className="flex items-center mb-10">
            <Image
              src="/logo-blanc.svg"
              alt="Ebook Cameroon"
              width={48}
              height={48}
            />
            <span className="ml-4 text-3xl font-extrabold tracking-wide">
              Ebook Cameroon
            </span>
          </Link>
          <h2 className="text-4xl font-bold max-w-lg leading-tight">
            Rejoignez la plus grande bibliothèque numérique du Cameroun
          </h2>
          <p className="mt-6 text-orange-100 max-w-md">
            Découvrez des milliers de livres, fiches et ressources éducatives,
            accessibles partout et à tout moment. Optimisez votre apprentissage
            avec Ebook Cameroon.
          </p>
        </div>

        <ul className="space-y-5 text-orange-200 max-w-md text-lg">
          <li>📚 Accès illimité aux ouvrages et documents scolaires</li>
          <li>📱 Lecture multi-appareils : PC, tablette, smartphone</li>
          <li>⚡ Recommandations personnalisées pour booster vos résultats</li>
          <li>🔒 Données sécurisées et confidentialité assurée</li>
        </ul>

        <p className="mt-auto text-orange-200 text-sm">
          © {new Date().getFullYear()} Ebook Cameroon. Tous droits réservés.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-10 sm:px-16 md:px-24">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Créer un compte
            </h1>
            <p className="mt-2 text-gray-600 text-sm">
              Déjà inscrit ?{" "}
              <Link
                href="/auth/connexion"
                className="text-orange-600 font-semibold hover:underline"
              >
                Connectez-vous ici
              </Link>
            </p>
          </div>

          <button
            onClick={handleGoogleSignUp}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {googleLoading ? (
              <span>Connexion en cours...</span>
            ) : (
              <>
                <Image
                  src="/google-logo.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                <span>S&apos;inscrire avec Google</span>
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <p className="text-red-600 text-center text-sm font-medium">
                {error}
              </p>
            )}
            {successMsg && (
              <p className="text-green-600 text-center text-sm font-medium">
                {successMsg}
              </p>
            )}

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Nom complet
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jean Dupont"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-orange-500
                 transition text-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@domaine.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-orange-500
                 transition text-black"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-orange-500
                 transition text-black"
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 8 caractères, avec au moins une majuscule et un chiffre
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                required
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                J&apos;accepte les{" "}
                <Link
                  href="/conditions"
                  className="text-orange-600 hover:underline font-medium"
                >
                  conditions d&apos;utilisation
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Inscription en cours..." : "S'inscrire gratuitement"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
