// app/components/Pricing.tsx
import React from "react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Basique",
    price: "0",
    description: "Accès limité aux ebooks gratuits et support communautaire.",
    features: [
      "Accès à 100+ ebooks gratuits",
      "Consultation en ligne uniquement",
      "Support communautaire",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "4 000 FCFA/mois",
    description: "Accès complet à la bibliothèque et téléchargement illimité.",
    features: [
      "Accès à toute la bibliothèque Ebook Cameroun",
      "Téléchargement illimité d’ebooks",
      "Support par email 24/7",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "7 000 FCFA/mois",
    description:
      "Toutes les fonctionnalités Pro + accès aux webinaires exclusifs.",
    features: [
      "Toutes les fonctionnalités Pro",
      "Accès aux webinaires et ateliers en ligne",
      "Assistance téléphonique prioritaire",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-orange-50 py-16" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-orange-600">
            Tarifs
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-orange-900 sm:text-4xl">
            Choisissez le plan qui vous convient
          </p>
          <p className="mt-4 text-orange-700">
            Profitez de notre bibliothèque numérique adaptée à vos besoins.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-lg shadow-md p-6 flex flex-col transition-shadow duration-300 ${
                plan.popular
                  ? "border-orange-600 bg-orange-100 shadow-lg"
                  : "border-orange-200 bg-white hover:shadow-lg"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  plan.popular ? "text-orange-800" : "text-orange-900"
                }`}
              >
                {plan.name}
              </h3>
              <p className="mt-4 text-orange-700">{plan.description}</p>
              <p
                className={`mt-6 text-4xl font-extrabold ${
                  plan.popular ? "text-orange-600" : "text-orange-900"
                }`}
              >
                {plan.price === "0" ? "Gratuit" : plan.price}
              </p>
              <ul className="mt-6 space-y-4 flex-1 text-orange-800">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-6 h-6 text-orange-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="auth/connexion">
                <button
                  className={`mt-8 w-full py-3 rounded-md font-medium text-white transition-colors ${
                    plan.popular
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {plan.price === "0" ? "Commencer" : "S'abonner"}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
