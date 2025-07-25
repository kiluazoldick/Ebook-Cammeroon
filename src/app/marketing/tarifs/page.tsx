"use client";

import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

type PlanType = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

const plans: PlanType[] = [
  {
    name: "Basique",
    price: "Gratuit",
    description: "Pour découvrir la plateforme à son rythme.",
    features: [
      "100+ ebooks gratuits",
      "Lecture en ligne",
      "Support communautaire",
    ],
    cta: "Commencer",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "1 000 FCFA/mois",
    description: "Idéal pour les lecteurs réguliers et curieux.",
    features: [
      "Accès illimité à tous les ebooks",
      "Téléchargement hors-ligne",
      "Recommandations personnalisées",
      "Support email 24/7",
    ],
    cta: "S’abonner",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "2 000 FCFA/mois",
    description: "Pour les passionnés et les créateurs.",
    features: [
      "Toutes les fonctionnalités Pro",
      "Accès à des webinaires & masterclasses",
      "Assistance téléphonique prioritaire",
      "Accès anticipé aux nouveautés",
    ],
    cta: "Rejoindre Premium",
    highlighted: false,
  },
];

const featuresCompare = [
  { label: "Ebooks gratuits", basique: true, pro: true, premium: true },
  { label: "Lecture hors-ligne", basique: false, pro: true, premium: true },
  {
    label: "Recommandations personnalisées",
    basique: false,
    pro: true,
    premium: true,
  },
  {
    label: "Téléchargement illimité",
    basique: false,
    pro: true,
    premium: true,
  },
  { label: "Webinaires exclusifs", basique: false, pro: false, premium: true },
  { label: "Support téléphonique", basique: false, pro: false, premium: true },
];

const handleSubscription = async (plan: PlanType) => {
  if (plan.price === "Gratuit") {
    window.location.href = "/auth/connexion";
  } else {
    const amount = plan.name === "Pro" ? 1000 : 2000;

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, plan: plan.name }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.link;
      } else {
        console.error("Erreur côté serveur:", data.error);
        alert("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur inattendue :", error);
      alert("Une erreur est survenue.");
    }
  }
};

export default function Tarifs() {
  return (
    <>
      <Head>
        <title>Tarifs | eBook Cameroun</title>
        <meta
          name="description"
          content="Découvrez nos offres d’abonnement adaptées à tous les lecteurs. Gratuit, Pro ou Premium, choisissez votre formule."
        />
      </Head>
      <div className="font-sans bg-white text-gray-800">
        <Navbar />
        <main className="pt-24 pb-16 bg-orange-50">
          {/* Header */}
          <section className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-extrabold text-orange-700">
              Des tarifs simples, pour tous les lecteurs
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Que vous soyez un lecteur occasionnel ou un passionné, nos offres
              s’adaptent à vos besoins et à votre rythme.
            </p>
          </section>

          {/* Pricing Cards */}
          <section className="mt-16 grid gap-8 px-6 max-w-7xl mx-auto md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 shadow-sm transition-all ${
                  plan.highlighted
                    ? "border-orange-600 bg-white shadow-lg scale-105"
                    : "bg-white border-orange-200"
                }`}
              >
                {plan.highlighted && (
                  <p className="text-xs uppercase font-bold text-orange-600 mb-4 tracking-wider">
                    Le plus populaire
                  </p>
                )}
                <h3 className="text-2xl font-bold text-orange-800">
                  {plan.name}
                </h3>
                <p className="mt-2 text-orange-600">{plan.description}</p>
                <p className="mt-6 text-3xl font-extrabold text-orange-700">
                  {plan.price}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-orange-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscription(plan)}
                  className="mt-8 w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md transition"
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </section>

          {/* Comparatif */}
          <section className="mt-24 max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">
              Comparatif des fonctionnalités
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-orange-100 text-orange-900">
                    <th className="p-4 text-left">Fonctionnalité</th>
                    <th className="p-4 text-center">Basique</th>
                    <th className="p-4 text-center">Pro</th>
                    <th className="p-4 text-center">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {featuresCompare.map((f, idx) => (
                    <tr
                      key={f.label}
                      className={idx % 2 === 0 ? "bg-white" : "bg-orange-50"}
                    >
                      <td className="p-4">{f.label}</td>
                      <td className="text-center">{f.basique ? "✔️" : "—"}</td>
                      <td className="text-center">{f.pro ? "✔️" : "—"}</td>
                      <td className="text-center">{f.premium ? "✔️" : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-24 max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-orange-800 mb-4 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold">
                  Puis-je changer d’abonnement ?
                </h3>
                <p className="mt-1 text-sm">
                  Oui, vous pouvez passer de Basique à Pro ou Premium à tout
                  moment depuis votre tableau de bord.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  L’offre gratuite a-t-elle une limite de temps ?
                </h3>
                <p className="mt-1 text-sm">
                  Non. L’offre Basique reste gratuite aussi longtemps que vous
                  le souhaitez.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Puis-je annuler mon abonnement Pro/Premium ?
                </h3>
                <p className="mt-1 text-sm">
                  Bien sûr. Vous pouvez annuler à tout moment. L’accès reste
                  actif jusqu’à la fin de la période en cours.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
