"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faBook,
  faHeart,
  faStar,
  faEllipsisVertical,
  faSearch,
  faArrowUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

// Données fictives pour les livres populaires
const popularBooks = [
  {
    id: 1,
    title: "Les Racines du Baobab",
    author: "Amina Diallo",
    cover: "/covers/baobab.jpg",
    rating: 4.8,
    reads: 12500,
    likes: 4200,
    description:
      "Une saga familiale qui traverse trois générations au cœur du Cameroun colonial.",
  },
  {
    id: 2,
    title: "L'Ombre du Léopard",
    author: "Samuel N'diaye",
    cover: "/covers/leopard.jpg",
    rating: 4.6,
    reads: 9800,
    likes: 3600,
    description:
      "Un thriller politique dans les coulisses du pouvoir à Yaoundé.",
  },
  {
    id: 3,
    title: "Chants de la Sanaga",
    author: "Fatima Mbala",
    cover: "/covers/sanaga.jpg",
    rating: 4.9,
    reads: 15400,
    likes: 5100,
    description:
      "Poésie contemporaine inspirée des traditions orales du Cameroun.",
  },
  {
    id: 4,
    title: "Le Secret des Monts Mandara",
    author: "Jean-Pierre Tchamba",
    cover: "/covers/mandara.jpg",
    rating: 4.7,
    reads: 11200,
    likes: 3800,
    description: "Une quête mystique dans les montagnes du Nord-Cameroun.",
  },
  {
    id: 5,
    title: "Douala by Night",
    author: "Martine Ewodo",
    cover: "/covers/douala.jpg",
    rating: 4.5,
    reads: 8700,
    likes: 2900,
    description:
      "Histoires entrelacées dans la métropole économique camerounaise.",
  },
  {
    id: 6,
    title: "Femmes de Fer",
    author: "Rebecca Mvondo",
    cover: "/covers/femmes.jpg",
    rating: 4.9,
    reads: 14300,
    likes: 4800,
    description: "Portraits de femmes camerounaises qui ont marqué l'histoire.",
  },
  {
    id: 7,
    title: "Rythmes Bamiléké",
    author: "David Fotso",
    cover: "/covers/rythmes.jpg",
    rating: 4.4,
    reads: 7600,
    likes: 2300,
    description: "Un voyage musical à travers l'Ouest camerounais.",
  },
  {
    id: 8,
    title: "La Révolte des Abo",
    author: "Paul Biya",
    cover: "/covers/revolte.jpg",
    rating: 4.3,
    reads: 6800,
    likes: 2100,
    description:
      "Roman historique sur la résistance anticoloniale au Cameroun.",
  },
];

// Composant pour la carte de livre
const BookCard = ({ book }: { book: (typeof popularBooks)[0] }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Badge populaire */}
      <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
        <FontAwesomeIcon icon={faFire} className="mr-1" />
        Populaire
      </div>

      {/* Couverture du livre */}
      <div className="h-48 bg-gray-200 relative">
        {/* Placeholder pour l'image - remplacé par une couleur de fond */}
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center">
          <FontAwesomeIcon icon={faBook} className="text-white text-4xl" />
        </div>
      </div>

      {/* Détails du livre */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600">Par {book.author}</p>
          </div>
          <button className="text-gray-400 hover:text-orange-500">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {book.description}
        </p>

        {/* Stats du livre */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
            <span>{book.rating}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBook} className="text-blue-500 mr-1" />
            <span>{book.reads.toLocaleString()} lectures</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-between gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
              isLiked
                ? "bg-red-50 text-red-500"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={isLiked ? "text-red-500" : ""}
            />
            <span className="ml-2">{isLiked ? "Aimé" : "J'aime"}</span>
          </button>

          <Link href={`/read/${book.id}`} className="flex-1">
            <button className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Lire
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PopularPage() {
  const [sortBy, setSortBy] = useState("popular");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fonction pour faire défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Vérifier la position de défilement
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* En-tête */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-orange-600 font-bold text-xl flex items-center"
            >
              <FontAwesomeIcon icon={faFire} className="mr-2" />
              Ebook Cameroun
            </Link>

            <div className="relative flex-1 max-w-md mx-4">
              <input
                type="text"
                placeholder="Rechercher des livres, auteurs..."
                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-orange-500">
                Accueil
              </Link>
              <Link href="/populaire" className="font-semibold text-orange-500">
                Populaire
              </Link>
              <Link
                href="/bibliotheque"
                className="text-gray-600 hover:text-orange-500"
              >
                Ma Bibliothèque
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Section titre et filtres */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <FontAwesomeIcon
                  icon={faFire}
                  className="text-orange-500 mr-3"
                />
                Livres Populaires
              </h1>
              <p className="text-gray-600 mt-2">
                Les histoires les plus lues et appréciées par la communauté
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="text-gray-500 mr-2"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none"
                >
                  <option value="popular">Plus populaires</option>
                  <option value="recent">Plus récents</option>
                  <option value="top-rated">Mieux notés</option>
                </select>
              </div>
            </div>
          </div>

          {/* Statistiques globales */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl p-6 text-white mb-8">
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-3xl font-bold">48K+</p>
                <p>Lectures aujourd&apos;hui</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">1.2M+</p>
                <p>Lectures ce mois</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">320K+</p>
                <p>Lecteurs actifs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de livres populaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Bouton de pagination */}
        <div className="mt-10 text-center">
          <button className="bg-white border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-50 transition">
            Voir plus de livres
          </button>
        </div>
      </main>

      {/* Bouton de retour en haut */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      {/* Pied de page */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ebook Cameroun</h3>
              <p className="text-gray-400">
                La plateforme de lecture en ligne qui célèbre la littérature
                camerounaise.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/populaire" className="hover:text-white">
                    Livres Populaires
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Catégories
                  </Link>
                </li>
                <li>
                  <Link href="/auteurs" className="hover:text-white">
                    Auteurs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/conditions" className="hover:text-white">
                    Conditions d&apos;utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="hover:text-white">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/droits" className="hover:text-white">
                    Droits d&apos;auteur
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Questions ou suggestions? Écrivez-nous à:
              </p>
              <p className="mt-2 text-orange-400">contact@ebookcameroun.cm</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2023 Ebook Cameroun. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
