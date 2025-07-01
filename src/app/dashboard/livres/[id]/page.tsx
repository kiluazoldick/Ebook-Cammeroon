// app/read/[id]/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Document, Page, pdfjs } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faArrowLeft,
  faDownload,
  faSearchPlus,
  faSearchMinus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Image from "next/image";

// En haut de votre fichier
const setupPdfWorker = () => {
  // Essayez d'abord avec unpkg
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
};

// Appelez cette fonction avant de rendre le composant
setupPdfWorker();

// Solution garantie pour le worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Book = {
  id: string;
  title: string;
  author: string;
  fileUrl: string;
  coverUrl?: string;
  description?: string;
};

export default function ReadBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfError, setPdfError] = useState(false);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

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
        }
      } catch (error) {
        console.error("Erreur inattendue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    // Mettre à jour la largeur du conteneur lorsque la fenêtre est redimensionnée
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.clientWidth, 1200);
        setContainerWidth(width);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Erreur de chargement du PDF:", error);
    setPdfError(true);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber((prev) => Math.min(numPages, prev + 1));
    }
  };

  const downloadBook = () => {
    if (book?.fileUrl) {
      window.open(book.fileUrl, "_blank");
    }
  };

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
        <span className="ml-3">Chargement du livre...</span>
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
          href="/populaire"
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
          href="/populaire"
          className="text-orange-500 hover:text-orange-700 flex items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Retour
        </Link>

        <div className="text-center mx-4 flex-1 min-w-[200px]">
          <h1 className="text-xl font-bold line-clamp-1" title={book.title}>
            {book.title}
          </h1>
          <p className="text-sm text-gray-600">par {book.author}</p>
        </div>

        <div className="flex items-center gap-2">
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
            onClick={downloadBook}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Télécharger
          </button>
        </div>
      </div>

      {/* Lecteur PDF */}
      <div className="container mx-auto px-4 py-8" ref={containerRef}>
        {pdfError ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
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
              <Link
                href="/populaire"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Retour à la bibliothèque
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-6 bg-white p-3 rounded-lg shadow-sm max-w-3xl mx-auto">
              <button
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                className={`px-4 py-2 rounded-l ${
                  pageNumber <= 1
                    ? "bg-gray-200 text-gray-400"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                Précédent
              </button>

              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max={numPages ?? 1}
                  value={pageNumber}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (!isNaN(page)) {
                      setPageNumber(Math.max(1, Math.min(numPages ?? 1, page)));
                    }
                  }}
                  className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
                />
                <span className="mx-2">/</span>
                <span>{numPages ?? "?"}</span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={!numPages || pageNumber >= numPages}
                className={`px-4 py-2 rounded-r ${
                  !numPages || pageNumber >= numPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                Suivant
              </button>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl overflow-auto">
                <Document
                  file={book.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex flex-col items-center justify-center h-[80vh]">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="text-orange-500 text-4xl animate-spin mb-4"
                      />
                      <p>Chargement du livre en cours...</p>
                    </div>
                  }
                  className="pdf-document"
                >
                  <Page
                    pageNumber={pageNumber}
                    width={containerWidth * scale}
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                  />
                </Document>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Section d'information sur le livre */}
      {book && !pdfError && (
        <div className="bg-white border-t mt-8 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">À propos de ce livre</h2>
            {book.coverUrl && (
              <div className="flex-shrink-0">
                <Image
                  src={book.coverUrl}
                  alt={`Couverture de ${book.title}`}
                  width={192}
                  height={256}
                  className="w-48 h-64 object-cover rounded-lg shadow-md"
                  style={{ width: "192px", height: "256px" }}
                  unoptimized
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-700 mb-4">par {book.author}</p>
              {book.description && (
                <p className="text-gray-600">{book.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
