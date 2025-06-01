"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faFilePen,
  faLightbulb,
  faChartSimple,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* En-tête */}
      <header className="mb-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-full">
            <FontAwesomeIcon
              icon={faRocket}
              className="text-white text-xl animate-pulse"
            />
            <h1 className="text-white text-xl font-semibold">
              CorrigeTesCours
            </h1>
          </div>

          {session?.user && (
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Bienvenue, {session.user.name} 👋
              </h2>
              <div className="h-px w-20 bg-indigo-200 mx-auto" />
            </div>
          )}

          <p className="text-gray-600 text-lg mb-4">
            Transformez votre façon de réviser en 4 étapes
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fonctionnalité 1 - Prise de notes */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-100 transition-all">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FontAwesomeIcon
                icon={faFilePen}
                className="text-indigo-600 text-2xl"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1.Prise de notes
              </h3>
              <p className="text-gray-600">
                Structuration automatique et suggestions de contenu
              </p>
            </div>
          </div>
        </div>

        {/* Fonctionnalité 2 - Résumé des cours */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-100 transition-all">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FontAwesomeIcon
                icon={faFileLines}
                className="text-indigo-600 text-2xl"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2.Résumé des cours
              </h3>
              <p className="text-gray-600">
                Résumés automatiques de vos notes avec synthèse intelligente
              </p>
            </div>
          </div>
        </div>

        {/* Fonctionnalité 3 - Quiz */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-100 transition-all">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="text-indigo-600 text-2xl"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3.Quiz intelligents
              </h3>
              <p className="text-gray-600">
                Génération automatique de questions personnalisées
              </p>
            </div>
          </div>
        </div>

        {/* Fonctionnalité 4 - Statistiques */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-100 transition-all">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="text-indigo-600 text-2xl"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                4.Suivi des progrès
              </h3>
              <p className="text-gray-600">
                Analyse détaillée de vos résultats et évolution
              </p>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-500 p-8 rounded-xl text-center space-y-4">
          <h2 className="text-white text-xl font-semibold">
            Démarrez votre révolution pédagogique
          </h2>
          <Link href="/dashboard/notes">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faRocket} className="animate-bounce" />
              Commencer
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
