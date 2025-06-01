"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar (identique à la page de connexion) */}
      <div className="hidden lg:block w-1/2 gradient-bg p-12 text-white">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center mb-8 lg:mb-12 group">
            <FontAwesomeIcon icon={faGraduationCap} className="text-3xl mr-3" />
            <span className="text-2xl font-bold">CorrigeTesCours</span>
          </Link>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez notre communauté
          </h2>
          <p className="text-indigo-100 mb-6">
            Plus de 50,000 étudiants utilisent déjà notre plateforme pour
            optimiser leur apprentissage et améliorer leurs résultats.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Accès immédiat à toutes les fonctionnalités</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>14 jours d essai gratuit</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Synchronisation multi-appareils</span>
            </li>
          </ul>
          <p className="text-indigo-200 text-sm">
            © {new Date().getFullYear()} CorrigeTesCours. Tous droits réservés.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 px-4">
          {/* En-tête */}
          <div className="text-center space-y-2">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-4xl text-indigo-600 mb-4 lg:hidden"
            />
            <h2 className="text-3xl font-bold text-gray-900">
              Créez un compte
            </h2>
            <p className="text-gray-500 text-sm">
              Déjà un compte ?{" "}
              <Link
                href="/auth/connexion"
                className="text-indigo-600 font-semibold"
              >
                Se connecter
              </Link>
            </p>
          </div>

          {/* Boutons OAuth */}
          <div className="space-y-4">
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center px-6 py-3.5
                       border border-gray-200 rounded-xl text-base font-medium
                       text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="mr-3 relative w-5 h-5">
                <Image
                  src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_48dp.png"
                  alt="Google Logo"
                  width={21}
                  height={21}
                  className="object-contain"
                />
              </div>
              Continuer avec Google
            </button>
          </div>

          {/* Séparateur */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-gray-400 text-sm">OU</span>
            </div>
          </div>

          {/* Formulaire */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom et prénom
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all"
                placeholder="Kilua Zoldick"
              />
            </div>

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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all"
                placeholder="••••••••"
              />
              <p className="mt-2 text-xs text-gray-500">
                Minimum 8 caractères avec au moins un chiffre et une majuscule
              </p>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-5 w-5 mt-1 text-indigo-600 border-gray-200 rounded
                         focus:ring-indigo-500 transition-all"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                J accepte les{" "}
                <Link
                  href="/conditions"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  conditions d utilisation
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3.5 px-6 rounded-xl
                       font-medium hover:bg-indigo-700 transition-colors"
            >
              S inscrire gratuitement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
