"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  faBook,
  faUser,
  faSpinner,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Author {
  id: string;
  nom: string;
  biographie: string;
  photoUrl?: string;
  bookCount?: number;
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);

      let query = supabase
        .from("Auteur")
        .select("*, Book(id)")
        .order("nom", { ascending: true });

      if (searchQuery) {
        query = query.ilike("nom", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Erreur de chargement des auteurs :", error);
      } else {
        const processedAuthors = data.map(
          (author: Author & { Book?: { id: string }[] }) => ({
            ...author,
            bookCount: author.Book?.length ?? 0,
          })
        );
        setAuthors(processedAuthors);
      }

      setLoading(false);
    };

    fetchAuthors();
  }, [searchQuery]);

  let content;
  if (loading) {
    content = (
      <div className="flex justify-center items-center h-64">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-orange-500 text-3xl animate-spin"
        />
      </div>
    );
  } else if (authors.length === 0) {
    content = (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {searchQuery
            ? `Aucun auteur trouvé pour "${searchQuery}"`
            : "Aucun auteur disponible pour le moment"}
        </p>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* En-tête compact */}
      <div className="border-b py-3 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">Auteurs</h1>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Rechercher un auteur..."
              className="w-full py-1.5 px-4 pl-9 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-300 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSpinner}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${
                loading ? "animate-spin" : "hidden"
              }`}
            />
            <FontAwesomeIcon
              icon={faUser}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${
                loading ? "hidden" : "block"
              }`}
            />
          </div>
        </div>
      </div>

      <main className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium text-gray-600">
            {authors.length} auteurs trouvés
          </h2>
        </div>

        {content}
      </main>
    </div>
  );
}

function AuthorCard({ author }: { readonly author: Author }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
      {/* Photo de l'auteur */}
      <div className="h-40 relative">
        {author.photoUrl ? (
          <Image
            src={author.photoUrl}
            alt={author.nom}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="bg-gradient-to-br from-orange-400 to-yellow-300 w-full h-full flex items-center justify-center text-white text-3xl">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>

      {/* Infos auteur */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800">{author.nom}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
            {author.biographie || "Aucune biographie disponible."}
          </p>
        </div>

        <div className="flex items-center text-xs text-gray-500 mt-auto">
          <FontAwesomeIcon icon={faBook} className="mr-1 text-orange-500" />
          <span>{author.bookCount || 0} livre(s)</span>
        </div>

        <Link
          href={`/dashboard/auteurs/${author.id}`}
          className="mt-3 text-xs text-orange-600 hover:underline flex items-center gap-1"
        >
          Voir les livres{" "}
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>
    </div>
  );
}
