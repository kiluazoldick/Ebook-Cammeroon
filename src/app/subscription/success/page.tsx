import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function PaymentSuccessPage() {
  return (
    <>
      <Head>
        <title>Paiement réussi | eBook Cameroun</title>
        <meta
          name="description"
          content="Votre paiement a été confirmé avec succès. Bienvenue dans la communauté eBook Cameroun !"
        />
      </Head>

      <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg px-10 py-14 text-center border border-orange-200 animate-fade-in">
            <div className="flex justify-center mb-6">
              <svg
                className="w-20 h-20 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold text-orange-700">
              Paiement confirmé
            </h1>
            <p className="mt-4 text-gray-700 text-lg">
              Merci pour votre confiance ! Votre abonnement est maintenant
              actif.
            </p>

            <div className="mt-8 flex justify-center">
              <Link href="/dashboard">
                <span className="inline-block bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-700 transition">
                  Accéder à mon espace
                </span>
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Vous recevrez également un e-mail de confirmation.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
