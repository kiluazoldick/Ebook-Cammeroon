"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { faBook, faUser, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// TypeScript Interfaces
interface Author {
  id: string;
  nom: string;
  biographie: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  bookCount?: number;
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("Auteur")
        .select("*, Book(id)")
        .order("nom", { ascending: true });

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
  }, []);

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
  } else if (authors.length === 0) {
    content = (
      <div className="text-center text-gray-500">Aucun auteur trouvé.</div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-orange-600 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Auteurs
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Liste des auteurs
        </h2>

        {content}
      </main>
    </div>
  );
}

function AuthorCard({ author }: { readonly author: Author }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Photo de l’auteur */}
      <div className="h-48 relative">
        {author.photoUrl ? (
          <Image
            src={author.photoUrl}
            alt={author.nom}
            className="object-cover w-full h-full"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="bg-gradient-to-br from-orange-400 to-yellow-300 w-full h-full flex items-center justify-center text-white text-4xl">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>

      {/* Infos auteur */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{author.nom}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
          {author.biographie || "Aucune biographie disponible."}
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <FontAwesomeIcon icon={faBook} className="mr-1 text-blue-500" />
          <span>{author.bookCount} livre(s)</span>
        </div>

        <Link
          href={`/dashboard/auteurs/${author.id}`}
          className="inline-block mt-4 text-sm text-orange-600 hover:underline"
        >
          Voir les livres
        </Link>
      </div>
    </div>
  );
}
