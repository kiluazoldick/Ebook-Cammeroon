// app/dashboard/livres/[id]/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faArrowLeft,
  faDownload,
  faSearchPlus,
  faSearchMinus,
  faBook,
  faHeart,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  author: string;
  fileUrl: string;
  coverUrl?: string;
  description?: string;
  reads: number;
  likes: number;
};

export default function ReadBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const [scale, setScale] = useState(1);
  const [isReading, setIsReading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("Book")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Erreur de chargement du livre:", error);
        } else {
          setBook(data);
          // Mettre à jour le compteur de lectures
          await supabase
            .from("Book")
            .update({ reads: (data.reads ?? 0) + 1 })
            .eq("id", id);
        }
      } catch (error) {
        console.error("Erreur inattendue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Gestion du plein écran
  const toggleFullscreen = () => {
    if (!pdfContainerRef.current) return;

    if (!isFullscreen) {
      if (pdfContainerRef.current.requestFullscreen) {
        pdfContainerRef.current.requestFullscreen();
      } else if (
        (
          pdfContainerRef.current as HTMLElement & {
            mozRequestFullScreen?: () => Promise<void>;
          }
        ).mozRequestFullScreen
      ) {
        (
          pdfContainerRef.current as HTMLElement & {
            mozRequestFullScreen?: () => Promise<void>;
          }
        ).mozRequestFullScreen!();
      } else if (
        (
          pdfContainerRef.current as HTMLElement & {
            webkitRequestFullscreen?: () => Promise<void>;
          }
        ).webkitRequestFullscreen
      ) {
        (
          pdfContainerRef.current as HTMLElement & {
            webkitRequestFullscreen?: () => Promise<void>;
          }
        ).webkitRequestFullscreen!();
      } else if (
        (
          pdfContainerRef.current as HTMLElement & {
            msRequestFullscreen?: () => Promise<void>;
          }
        ).msRequestFullscreen
      ) {
        (
          pdfContainerRef.current as HTMLElement & {
            msRequestFullscreen?: () => Promise<void>;
          }
        ).msRequestFullscreen!();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (
        (document as Document & { mozCancelFullScreen?: () => void })
          .mozCancelFullScreen
      ) {
        (document as Document & { mozCancelFullScreen?: () => void })
          .mozCancelFullScreen!();
      } else if (
        (document as Document & { webkitExitFullscreen?: () => void })
          .webkitExitFullscreen
      ) {
        (document as Document & { webkitExitFullscreen?: () => void })
          .webkitExitFullscreen!();
      } else if (
        (document as Document & { msExitFullscreen?: () => void })
          .msExitFullscreen
      ) {
        (document as Document & { msExitFullscreen?: () => void })
          .msExitFullscreen!();
      }
      setIsFullscreen(false);
    }
  };

  // Téléchargement direct du PDF
  const downloadBook = () => {
    if (!book?.fileUrl) return;

    const link = document.createElement("a");
    link.href = book.fileUrl;
    link.download = `${book.title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Gestion des événements plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const resetZoom = () => {
    setScale(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-orange-500 text-4xl animate-spin"
        />
        <span className="ml-3 text-black">Chargement du livre...</span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Livre non trouvé
        </h2>
        <p className="text-gray-600 mb-6">
          Le livre que vous cherchez n&apos;existe pas ou a été supprimé.
        </p>
        <Link
          href="/dashboard/populaires"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Retour à la bibliothèque
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barre d'outils */}
      <div className="bg-white shadow-md py-3 px-4 flex flex-wrap justify-between items-center gap-3">
        <Link
          href="/dashboard/populaires"
          className="text-orange-500 hover:text-orange-700 flex items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Retour
        </Link>

        <div className="text-center mx-4 flex-1 min-w-[200px]">
          <h1
            className="text-xl font-bold line-clamp-1 text-black"
            title={book.title}
          >
            {book.title}
          </h1>
          <p className="text-sm text-gray-600">par {book.author}</p>
        </div>

        <button
          onClick={downloadBook}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
          Télécharger
        </button>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        {!isReading ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Prêt à lire{" "}
                <span className="text-orange-500">{book.title}</span>?
              </h2>
              <p className="text-gray-600">
                Cliquez sur le bouton ci-dessous pour commencer votre lecture
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {book.coverUrl && (
                <div className="flex-shrink-0">
                  <Image
                    src={book.coverUrl}
                    alt={`Couverture de ${book.title}`}
                    width={256}
                    height={384}
                    className="w-64 h-96 object-cover rounded-lg shadow-md"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-black">
                    {book.title}
                  </h3>
                  <p className="text-gray-700 mb-4">par {book.author}</p>
                  {book.description && (
                    <p className="text-gray-600 mb-6">{book.description}</p>
                  )}

                  <div className="flex gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faBook} className="mr-1" />
                      <span>{book.reads || 0} lectures</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-red-500 mr-1"
                      />
                      <span>{book.likes || 0} j&apos;aime</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsReading(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg w-full transition"
                >
                  Commencer la lecture
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={pdfContainerRef}
            className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl overflow-auto mx-auto"
          >
            {pdfError ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Erreur de chargement du livre
                </h2>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                  Impossible de charger le fichier PDF. Veuillez vérifier que le
                  lien est correct et que vous êtes connecté à internet.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Réessayer
                  </button>
                  <button
                    onClick={() => setIsReading(false)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Retour aux détails
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <button
                    onClick={zoomOut}
                    title="Zoom arrière"
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
                  >
                    <FontAwesomeIcon icon={faSearchMinus} />
                  </button>

                  <button
                    onClick={resetZoom}
                    className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                  >
                    {Math.round(scale * 100)}%
                  </button>

                  <button
                    onClick={zoomIn}
                    title="Zoom avant"
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
                  >
                    <FontAwesomeIcon icon={faSearchPlus} />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    title={
                      isFullscreen
                        ? "Quitter le plein écran"
                        : "Mode plein écran"
                    }
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
                  >
                    <FontAwesomeIcon
                      icon={isFullscreen ? faCompress : faExpand}
                    />
                  </button>

                  <button
                    onClick={() => setIsReading(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Retour aux détails
                  </button>
                </div>

                <div className="overflow-auto border rounded-lg">
                  <iframe
                    src={`${book.fileUrl}#view=fitH`}
                    title={`Livre: ${book.title} - Aperçu PDF`}
                    className="w-full min-h-[70vh]"
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "0 0",
                      width: `${100 / scale}%`,
                      height: `${100 / scale}%`,
                    }}
                    onError={() => setPdfError(true)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
