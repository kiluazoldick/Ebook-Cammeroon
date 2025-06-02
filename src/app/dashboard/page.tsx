"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFire, faStar } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-6 md:px-12">
      {/* Header simple */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          Bienvenue sur Ebook Cameroun
        </h1>
        <p className="text-gray-500">
          Découvrez, lisez et partagez vos histoires préférées
        </p>
      </header>

      {/* Sections principales */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Livres populaires */}
        <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon
              icon={faFire}
              className="text-orange-500 text-xl"
            />
            <h2 className="text-lg font-semibold">Livres Populaires</h2>
          </div>
          <p className="text-sm text-gray-600">
            Les histoires les plus lues par la communauté.
          </p>
          <Link
            href="#"
            className="text-orange-600 mt-3 inline-block text-sm font-medium hover:underline"
          >
            Explorer
          </Link>
        </div>

        {/* Livres recommandés */}
        <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500 text-xl"
            />
            <h2 className="text-lg font-semibold">Recommandations</h2>
          </div>
          <p className="text-sm text-gray-600">
            Basé sur vos lectures et préférences.
          </p>
          <Link
            href="#"
            className="text-orange-600 mt-3 inline-block text-sm font-medium hover:underline"
          >
            Voir les suggestions
          </Link>
        </div>

        {/* Auteurs en vedette */}
        <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon
              icon={faUser}
              className="text-orange-400 text-xl"
            />
            <h2 className="text-lg font-semibold">Auteurs en vedette</h2>
          </div>
          <p className="text-sm text-gray-600">
            Les plumes à ne pas manquer au Cameroun.
          </p>
          <Link
            href="#"
            className="text-orange-600 mt-3 inline-block text-sm font-medium hover:underline"
          >
            Découvrir
          </Link>
        </div>
      </main>

      {/* CTA principal */}
      <section className="mt-12 bg-gradient-to-r from-orange-500 to-yellow-400 text-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">
          Plongez dans un monde de lecture
        </h2>
        <p className="mb-4 text-sm">
          Des centaines de livres et d’histoires africaines vous attendent
        </p>
        <Link href="#">
          <button className="bg-white text-orange-600 font-medium px-6 py-2 rounded-full shadow hover:scale-105 transition">
            Commencer à lire
          </button>
        </Link>
      </section>
    </div>
  );
}
