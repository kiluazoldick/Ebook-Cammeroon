"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-1/2 gradient-bg p-12 text-white">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center mb-8 lg:mb-12 group">
            <FontAwesomeIcon icon={faGraduationCap} className="text-3xl mr-3" />
            <span className="text-2xl font-bold">CorrigeTesCours</span>
          </Link>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            Transformez votre façon de réviser
          </h2>
          <p className="text-indigo-100 mb-6">
            Notre plateforme utilise l IA pour générer des résumés intelligents,
            des quiz personnalisés et des plans de révision optimisés.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Résumés automatiques de vos cours</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Quiz adaptatifs pour tester vos connaissances</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
              <span>Planification intelligente des révisions</span>
            </li>
          </ul>
          <p className="text-indigo-200 text-sm">
            © {new Date().getFullYear()} CorrigeTesCours. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Section Mobile Optimisée */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 px-4">
          {/* En-tête */}
          <div className="text-center space-y-2">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-4xl text-indigo-600 mb-4 lg:hidden"
            />
            <h2 className="text-3xl font-bold text-gray-900">Connectez-vous</h2>
            <p className="text-gray-500 text-sm">
              Pas de compte ?{" "}
              <Link
                href="/auth/inscription"
                className="text-indigo-600 font-semibold"
              >
                S inscrire
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
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Link
                  href="/auth/mot-de-passe-oublie"
                  className="text-indigo-600 text-sm hover:text-indigo-500"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3.5 px-6 rounded-xl
                       font-medium hover:bg-indigo-700 transition-colors"
            >
              Continuer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
