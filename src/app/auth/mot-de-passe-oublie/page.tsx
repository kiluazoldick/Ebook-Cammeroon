"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar identique */}
      <div className="hidden lg:block w-1/2 gradient-bg p-12 text-white">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center mb-8 lg:mb-12 group">
            <FontAwesomeIcon icon={faGraduationCap} className="text-3xl mr-3" />
            <span className="text-2xl font-bold">CorrigeTesCours</span>
          </Link>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            Retrouvez votre accès en quelques clics
          </h2>
          <p className="text-indigo-100 mb-6">
            Notre système de récupération sécurisé vous permet de reprendre le
            contrôle de votre compte rapidement et simplement.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Lien de réinitialisation valable 1 heure</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Notifications de sécurité instantanées</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Support technique 24h/24</span>
            </li>
          </ul>
          <p className="text-indigo-200 text-sm">
            © {new Date().getFullYear()} CorrigeTesCours. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Formulaire de réinitialisation */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 px-4">
          <div className="text-center space-y-2">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-4xl text-indigo-600 mb-4 lg:hidden"
            />
            <h2 className="text-3xl font-bold text-gray-900">
              Mot de passe oublié ?
            </h2>
            <p className="text-gray-500 text-sm">
              Entrez votre adresse email pour recevoir un lien de
              réinitialisation
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all"
                placeholder="exemple@email.com"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3.5 px-6 rounded-xl
                       font-medium hover:bg-indigo-700 transition-colors"
            >
              Envoyer le lien
            </button>

            <div className="text-center text-sm">
              <Link
                href="/auth/connexion"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                ← Retour à la connexion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
