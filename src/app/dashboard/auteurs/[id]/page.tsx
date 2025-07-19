"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBook,
  faStar,
  faArrowLeft,
  faHeart,
  faBookOpen,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

interface Auteur {
  id: string;
  nom: string;
  biographie: string | null;
  photoUrl: string | null;
}

interface Livre {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  rating: number;
  reads: number;
  likes: number;
  category: string;
}

export default function AuteurDetailPage() {
  const { id } = useParams();
  const [auteur, setAuteur] = useState<Auteur | null>(null);
  const [livres, setLivres] = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    nombre_livres: 0,
    total_lectures: 0,
    note_moyenne: 0,
    total_likes: 0,
  });

  useEffect(() => {
    const fetchAuteurData = async () => {
      setLoading(true);

      try {
        // Récupérer l'auteur
        const { data: auteurData, error: auteurError } = await supabase
          .from("Auteur")
          .select("*")
          .eq("id", id)
          .single();

        if (auteurError) throw auteurError;
        setAuteur(auteurData);

        // Récupérer les livres de l'auteur
        const { data: livresData, error: livresError } = await supabase
          .from("Book")
          .select(
            "id, title, description, coverUrl, rating, reads, likes, category"
          )
          .eq("auteur_id", id);

        if (livresError) throw livresError;
        setLivres(livresData || []);

        // Calculer les statistiques
        const nombre_livres = livresData?.length || 0;
        const total_lectures =
          livresData?.reduce((sum, livre) => sum + livre.reads, 0) || 0;
        const total_likes =
          livresData?.reduce((sum, livre) => sum + livre.likes, 0) || 0;
        const total_rating =
          livresData?.reduce((sum, livre) => sum + livre.rating, 0) || 0;
        const note_moyenne =
          nombre_livres > 0 ? total_rating / nombre_livres : 0;

        setStats({
          nombre_livres,
          total_lectures,
          note_moyenne,
          total_likes,
        });
      } catch (error) {
        console.error("Erreur de chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuteurData();
    }
  }, [id]);

  const updateReads = async (livreId: string) => {
    await supabase.rpc("increment_reads", { book_id: livreId });
  };

  const updateLikes = async (livreId: string) => {
    const { data } = await supabase
      .from("Book")
      .select("likes")
      .eq("id", livreId)
      .single();

    if (data) {
      const newLikes = data.likes + 1;
      await supabase.from("Book").update({ likes: newLikes }).eq("id", livreId);

      setLivres((prev) =>
        prev.map((livre) =>
          livre.id === livreId ? { ...livre, likes: newLikes } : livre
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* En-tête compact */}
      <div className="border-b py-3 px-4">
        <div className="flex items-center">
          <Link href="/dashboard/auteurs" className="text-orange-500 mr-3">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="text-gray-800 font-semibold text-lg flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-orange-500" />
            {auteur?.nom ?? "Chargement..."}
          </h1>
        </div>
      </div>

      <main className="px-4 py-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-50 flex-shrink-0">
            {auteur?.photoUrl ? (
              <Image
                src={auteur.photoUrl}
                alt={`Photo de ${auteur.nom}`}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white text-3xl"
                />
              </div>
            )}
          </div>

          <div className="flex-grow">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Biographie
            </h2>
            <p className="text-gray-700 text-sm">
              {auteur?.biographie ??
                "Aucune biographie disponible pour cet auteur."}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-xl p-4 text-white mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-xl font-bold">{stats.nombre_livres}</p>
              <p className="text-xs">Livres</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-xl font-bold">
                {stats.total_lectures.toLocaleString()}
              </p>
              <p className="text-xs">Lectures</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-xl font-bold">
                {stats.note_moyenne.toFixed(1)}
              </p>
              <p className="text-xs">Note moyenne</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-xl font-bold">
                {stats.total_likes.toLocaleString()}
              </p>
              <p className="text-xs">J&apos;aime</p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Livres de {auteur?.nom}
        </h2>

        {(() => {
          if (loading) {
            return (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            );
          } else if (livres.length === 0) {
            return (
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm">
                  Aucun livre trouvé pour cet auteur
                </p>
              </div>
            );
          } else {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {livres.map((livre) => (
                  <LivreCard
                    key={livre.id}
                    livre={livre}
                    onRead={() => updateReads(livre.id)}
                    onLike={() => updateLikes(livre.id)}
                  />
                ))}
              </div>
            );
          }
        })()}
      </main>
    </div>
  );
}

const LivreCard = ({
  livre,
  onRead,
  onLike,
}: {
  livre: Livre;
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
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
      <div className="h-40 relative">
        {livre.coverUrl ? (
          <Image
            src={livre.coverUrl}
            alt={`Couverture de ${livre.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center">
            <FontAwesomeIcon icon={faBook} className="text-white text-3xl" />
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 line-clamp-1 text-base">
            {livre.title}
          </h3>
          <p className="text-xs text-gray-600">Catégorie: {livre.category}</p>
        </div>

        <p className="text-xs text-gray-700 mb-3 line-clamp-2 flex-grow">
          {livre.description}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
            <span>{livre.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="text-blue-500 mr-1" />
            <span>{livre.reads.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-1" />
            <span>{livre.likes.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleLike}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center text-xs ${
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
            <span className="ml-1">{isLiked ? "Aimé" : "J'aime"}</span>
          </button>

          <Link
            href={`/dashboard/livres/${livre.id}`}
            className="flex-1"
            onClick={onRead}
          >
            <button className="w-full py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center justify-center text-xs">
              <FontAwesomeIcon icon={faBookOpen} className="mr-1" />
              <span>Lire</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
