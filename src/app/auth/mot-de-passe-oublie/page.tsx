"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ForgotPasswordPage() {
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim()) {
      setErrorMsg("Veuillez saisir une adresse email valide.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/nouveau-mot-de-passe`, // page de reset à créer
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg(
        "Un email de réinitialisation du mot de passe a été envoyé. Vérifiez votre boîte de réception."
      );
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-orange-700 via-orange-900 to-black text-white">
      {/* Sidebar - visible sur grand écran */}
      <div className="hidden lg:flex w-1/2 p-12 flex-col justify-center bg-orange-900 bg-opacity-90">
        <Link href="/" className="flex items-center mb-12">
          <FontAwesomeIcon
            icon={faBookOpen}
            className="text-4xl mr-3 text-white"
          />
          <span className="text-3xl font-extrabold text-white">
            Ebook Cameroun
          </span>
        </Link>

        <h2 className="text-4xl font-bold mb-6 text-white">
          Mot de passe oublié ?
        </h2>
        <p className="text-white mb-8 max-w-lg leading-relaxed">
          Pas de panique ! Indiquez votre adresse email liée à votre compte,
          nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>
        <ul className="space-y-4 text-white list-disc list-inside">
          <li>Simple et sécurisé</li>
          <li>Réinitialisation rapide</li>
          <li>Accès à vos ebooks et ressources en quelques clics</li>
        </ul>
        <p className="mt-auto text-white text-xs">
          © {new Date().getFullYear()} Ebook Cameroun. Tous droits réservés.
        </p>
      </div>

      {/* Formulaire */}
      <div className="w-full lg:w-1/2 bg-white text-gray-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faBookOpen}
              className="text-orange-600 text-5xl mb-4 lg:hidden"
            />
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Réinitialiser le mot de passe
            </h1>
            <p className="text-gray-600 text-sm">
              Vous avez un compte ?{" "}
              <Link
                href="/auth/connexion"
                className="text-orange-600 font-semibold hover:underline"
              >
                Connectez-vous
              </Link>
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-center">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-100 text-green-700 p-3 rounded-md text-center">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-900"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {loading
                ? "Envoi en cours..."
                : "Envoyer le lien de réinitialisation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
