import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function PaymentFailurePage() {
  return (
    <>
      <Head>
        <title>Paiement échoué | eBook Cameroun</title>
        <meta
          name="description"
          content="Une erreur est survenue lors du traitement de votre paiement. Essayez de nouveau ou contactez-nous."
        />
      </Head>

      <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg px-10 py-14 text-center border border-red-200 animate-fade-in">
            <div className="flex justify-center mb-6">
              <svg
                className="w-20 h-20 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold text-red-600">
              Paiement échoué
            </h1>
            <p className="mt-4 text-gray-700 text-lg">
              Oups… une erreur est survenue pendant le paiement. 😕
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              Cela peut venir d’un problème de connexion, de solde insuffisant
              ou d’un refus de votre opérateur.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Link href="/marketing/tarifs">
                <span className="inline-block bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-700 transition">
                  Réessayer le paiement
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-sm text-orange-600 underline hover:text-orange-800 transition">
                  Contacter le support
                </span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
