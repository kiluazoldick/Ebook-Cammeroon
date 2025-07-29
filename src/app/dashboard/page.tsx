"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFire, faStar, faBookOpen, faSearch, faComments, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-6 md:px-12">
      {/* Header amélioré */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
          Bienvenue sur Ebook Cameroun
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Découvrez, lisez et partagez vos histoires préférées. La plus grande bibliothèque numérique camerounaise.
        </p>
      </header>

      {/* Sections principales */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Livres populaires */}
        <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon icon={faFire} className="text-orange-500 text-xl" />
            <h2 className="text-lg font-semibold">Livres Populaires</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Les histoires les plus lues et appréciées par la communauté.
          </p>
          <Link
            href="/dashboard/populaires"
            className="text-orange-600 mt-3 inline-block text-sm font-medium hover:underline"
          >
            Explorer →
          </Link>
        </div>

        {/* Livres recommandés */}
        <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl" />
            <h2 className="text-lg font-semibold">Recommandations</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Sélection personnalisée selon vos goûts de lecture.
          </p>
          <Link
            href="/dashboard/recommandes"
            className="text-orange-600 mt-3 inline-block text-sm font-medium hover:underline"
          >
            Voir les suggestions →
          </Link>
        </div>

        {/* Auteurs en vedette */}
        <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon icon={faUser} className="text-orange-400 text-xl" />
            <h2 className="text-lg font-semibold">Auteurs en vedette</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Découvrez les talents littéraires camerounais.
          </p>
          <Link
            href="/dashboard/auteurs"
            className="text-orange-600 mt-3 inline-block text-sm font-medium hover:underline"
          >
            Découvrir →
          </Link>
        </div>
      </main>

      {/* CTA principal */}
      <section className="mt-12 bg-gradient-to-r from-orange-500 to-yellow-400 text-white p-6 rounded-lg text-center shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Plongez dans un monde de lecture
        </h2>
        <p className="mb-4 text-sm md:text-base">
          Des centaines de livres et d'histoires africaines vous attendent
        </p>
        <Link href="/dashboard/populaires">
          <button className="bg-white text-orange-600 font-medium px-6 py-2 rounded-full shadow hover:scale-105 transition">
            Commencer à lire
          </button>
        </Link>
      </section>

      {/* Nouvelles fonctionnalités à venir */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Prochaines fonctionnalités</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Club de lecture */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faComments} className="text-orange-500 text-xl" />
              <h3 className="font-semibold">Clubs de lecture</h3>
              <span className="ml-auto bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Bientôt</span>
            </div>
            <p className="text-sm text-gray-600">
              Échangez avec d'autres lecteurs autour de vos livres préférés.
            </p>
          </div>

          {/* Recherche avancée */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faSearch} className="text-orange-500 text-xl" />
              <h3 className="font-semibold">Recherche avancée</h3>
              <span className="ml-auto bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Bientôt</span>
            </div>
            <p className="text-sm text-gray-600">
              Trouvez des livres par thème, région ou langue.
            </p>
          </div>

          {/* Défis lecture */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faTrophy} className="text-orange-500 text-xl" />
              <h3 className="font-semibold">Défis lecture</h3>
              <span className="ml-auto bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Bientôt</span>
            </div>
            <p className="text-sm text-gray-600">
              Participez à des challenges et gagnez des badges.
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques de lecture (coming soon) */}
      <section className="mt-16 bg-orange-50 p-6 rounded-lg border border-orange-100">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Vos statistiques de lecture</h2>
            <p className="text-sm text-gray-600 max-w-md">
              Bientôt disponible : Suivez votre progression, vos livres lus et vos objectifs.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="bg-orange-100 text-orange-800 text-sm px-4 py-2 rounded-full inline-block">
              Fonctionnalité à venir
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
