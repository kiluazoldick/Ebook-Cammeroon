"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faFire,
  faBook,
  faHeart,
  faStar,
  faSearch,
  faFilter,
  faSpinner,
  faBookOpen,
  faEye,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";

// Type pour les livres
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  fileUrl: string;
  rating: number;
  reads: number;
  likes: number;
  category: string;
}

export default function PopularPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("reads");
  const [searchQuery, setSearchQuery] = useState("");

  // Charger les livres depuis Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      let query = supabase
        .from("Book")
        .select("*")
        .order(sortBy, { ascending: false })
        .limit(12);

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Erreur de chargement des livres:", error);
      } else {
        setBooks(data as Book[]);
      }

      setLoading(false);
    };

    fetchBooks();
  }, [sortBy, searchQuery]);

  // Mettre à jour les lectures
  const updateReads = async (bookId: string) => {
    const { data } = await supabase
      .from("Book")
      .select("reads")
      .eq("id", bookId)
      .single();

    if (data) {
      const newReads = data.reads + 1;
      await supabase.from("Book").update({ reads: newReads }).eq("id", bookId);
    }
  };

  // Mettre à jour les likes
  const updateLikes = async (bookId: string) => {
    const { data } = await supabase
      .from("Book")
      .select("likes")
      .eq("id", bookId)
      .single();

    if (data) {
      const newLikes = data.likes + 1;
      await supabase.from("Book").update({ likes: newLikes }).eq("id", bookId);

      // Mettre à jour l'état local
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, likes: newLikes } : book
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* En-tête */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faFire}
                className="text-orange-500 text-xl"
              />
              <h1 className="text-xl font-bold text-orange-600">
                Livres Populaires
              </h1>
            </div>

            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Rechercher des livres ..."
                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Section titre et filtres */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div>
              <p className="text-gray-600">
                Les histoires les plus lues et appréciées par la communauté
              </p>
            </div>

            <div className="flex items-center w-full md:w-auto">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="text-gray-500 mr-2"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none w-full"
                >
                  <option value="reads">Plus lus</option>
                  <option value="likes">Plus aimés</option>
                  <option value="rating">Mieux notés</option>
                  <option value="createdAt">Plus récents</option>
                </select>
              </div>
            </div>
          </div>

          {/* Statistiques globales */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl p-5 text-white mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-2xl font-bold">
                  {books
                    .reduce((sum, book) => sum + book.reads, 0)
                    .toLocaleString()}
                  +
                </p>
                <p className="text-sm">Lectures totales</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-2xl font-bold">
                  {books
                    .reduce((sum, book) => sum + book.likes, 0)
                    .toLocaleString()}
                  +
                </p>
                <p className="text-sm">J&apos;aime total</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-2xl font-bold">{books.length}</p>
                <p className="text-sm">Livres disponibles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de livres populaires */}
        {(() => {
          let content;
          if (loading) {
            content = (
              <div className="flex justify-center items-center h-64">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-orange-500 text-4xl animate-spin"
                />
              </div>
            );
          } else if (books.length === 0) {
            content = (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700">
                  Aucun livre trouvé
                </h3>
                <p className="text-gray-500 mt-2">
                  {searchQuery
                    ? `Aucun résultat pour "${searchQuery}"`
                    : "Veuillez ajouter des livres à la bibliothèque"}
                </p>
              </div>
            );
          } else {
            content = (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onRead={() => updateReads(book.id)}
                      onLike={() => updateLikes(book.id)}
                    />
                  ))}
                </div>

                {/* Bouton Voir plus */}
                <div className="mt-8 text-center">
                  <button className="bg-orange-50 text-orange-600 font-medium px-6 py-3 rounded-full hover:bg-orange-100 transition flex items-center gap-2 mx-auto">
                    Voir plus de livres{" "}
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                  </button>
                </div>
              </>
            );
          }
          return content;
        })()}
      </main>
    </div>
  );
}

// Composant BookCard amélioré
const BookCard = ({
  book,
  onRead,
  onLike,
}: {
  book: Book;
  onRead: () => void;
  onLike: () => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      onLike();
      setIsLiked(true);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
      {/* Couverture du livre */}
      <div className="relative h-48">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`Couverture de ${book.title}`}
            className="w-full h-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center">
            <FontAwesomeIcon icon={faBook} className="text-white text-4xl" />
          </div>
        )}
      </div>

      {/* Détails du livre */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-bold text-gray-800 line-clamp-1 text-lg">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">Par {book.author}</p>
        </div>

        <p className="text-sm text-gray-700 mb-3 line-clamp-2 flex-grow">
          {book.description}
        </p>

        {/* Stats du livre */}
        <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
            <span>{book.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="text-blue-500 mr-1" />
            <span>{book.reads.toLocaleString()} lectures</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-1" />
            <span>{book.likes.toLocaleString()} j&apos;aime</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3">
          <button
            onClick={handleLike}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
              isLiked
                ? "bg-red-50 text-red-500"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            disabled={isLiked}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={isLiked ? "text-red-500" : ""}
            />
            <span className="ml-2">{isLiked ? "Aimé" : "J'aime"}</span>
          </button>

          <Link
            href={`/dashboard/livres/${book.id}`}
            className="flex-1"
            onClick={onRead}
          >
            <button className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>Lire</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
