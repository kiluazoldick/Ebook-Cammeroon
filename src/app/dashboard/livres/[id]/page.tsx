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
  faPlay,
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
      <div className="flex justify-center items-center h-screen bg-white">
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
      <div className="flex flex-col justify-center items-center h-screen text-center p-4 bg-white">
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
    <div className="min-h-screen bg-white">
      {/* Barre d'outils compacte */}
      <div className="bg-white border-b py-3 px-4 flex flex-wrap justify-between items-center gap-3">
        <Link
          href="/dashboard/populaires"
          className="text-orange-500 hover:text-orange-700 flex items-center text-sm"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Retour
        </Link>

        <div className="text-center mx-4 flex-1 min-w-[200px]">
          <h1
            className="text-lg font-semibold line-clamp-1 text-black"
            title={book.title}
          >
            {book.title}
          </h1>
          <p className="text-xs text-gray-600">par {book.author}</p>
        </div>

        <button
          onClick={downloadBook}
          className="bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 flex items-center text-sm"
        >
          <FontAwesomeIcon icon={faDownload} className="mr-1.5" />
          Télécharger
        </button>
      </div>

      {/* Contenu principal */}
      <div className="px-4 py-6">
        {!isReading ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Prêt à lire{" "}
                <span className="text-orange-500">{book.title}</span>?
              </h2>
              <p className="text-gray-600 text-sm">
                Cliquez sur le bouton ci-dessous pour commencer votre lecture
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              {book.coverUrl && (
                <div className="flex-shrink-0 w-48 h-64 relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={book.coverUrl}
                    alt={`Couverture de ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {book.title}
                  </h3>
                  <p className="text-gray-700 mb-3">par {book.author}</p>
                  {book.description && (
                    <p className="text-gray-600 mb-4 text-sm">
                      {book.description}
                    </p>
                  )}

                  <div className="flex gap-4 text-xs text-gray-500">
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
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-5 rounded-lg w-full transition flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faPlay} />
                  <span>Commencer la lecture</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div ref={pdfContainerRef} className="w-full overflow-hidden">
            {/* Barre de contrôle PDF */}
            <div className="flex flex-wrap justify-center gap-2 mb-3 bg-gray-50 py-2 px-3 rounded-lg">
              <button
                onClick={zoomOut}
                title="Zoom arrière"
                className="bg-white text-gray-700 p-1.5 rounded-full hover:bg-gray-100 border"
              >
                <FontAwesomeIcon icon={faSearchMinus} className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={resetZoom}
                className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded border"
              >
                {Math.round(scale * 100)}%
              </button>

              <button
                onClick={zoomIn}
                title="Zoom avant"
                className="bg-white text-gray-700 p-1.5 rounded-full hover:bg-gray-100 border"
              >
                <FontAwesomeIcon icon={faSearchPlus} className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                title={
                  isFullscreen ? "Quitter le plein écran" : "Mode plein écran"
                }
                className="bg-white text-gray-700 p-1.5 rounded-full hover:bg-gray-100 border"
              >
                <FontAwesomeIcon
                  icon={isFullscreen ? faCompress : faExpand}
                  className="w-3.5 h-3.5"
                />
              </button>

              <button
                onClick={() => setIsReading(false)}
                className="bg-white text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 border text-sm"
              >
                Retour aux détails
              </button>
            </div>

            {pdfError ? (
              <div className="text-center py-8 bg-white rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  Erreur de chargement du livre
                </h2>
                <p className="text-gray-600 mb-5 max-w-xl mx-auto text-sm">
                  Impossible de charger le fichier PDF. Veuillez vérifier que le
                  lien est correct et que vous êtes connecté à internet.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-300 text-sm"
                  >
                    Réessayer
                  </button>
                  <button
                    onClick={() => setIsReading(false)}
                    className="bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 text-sm"
                  >
                    Retour aux détails
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-[calc(100vh-150px)] border rounded-lg bg-gray-50">
                <iframe
                  src={`${book.fileUrl}#view=fitH`}
                  title={`Livre: ${book.title} - Aperçu PDF`}
                  className="w-full h-full"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "0 0",
                    width: `${100 / scale}%`,
                    height: `${100 / scale}%`,
                  }}
                  onError={() => setPdfError(true)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
