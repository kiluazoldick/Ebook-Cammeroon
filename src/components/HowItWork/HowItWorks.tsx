import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenFancy,
  faBookOpen,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Créez votre compte",
      description:
        "Inscrivez-vous gratuitement et personnalisez votre profil selon vos préférences de lecture ou d’écriture.",
      icon: faPenFancy,
    },
    {
      number: 2,
      title: "Lisez ou publiez des histoires",
      description:
        "Parcourez des centaines d’histoires par genre, ou commencez à publier les vôtres chapitre par chapitre.",
      icon: faBookOpen,
    },
    {
      number: 3,
      title: "Rejoignez la communauté",
      description:
        "Suivez vos auteurs préférés, commentez les chapitres et grimpez dans les classements grâce à vos lectures.",
      icon: faRocket,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-orange-600">
            Fonctionnement
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-orange-900 sm:text-4xl">
            Commencez en quelques étapes
          </p>
          <p className="mt-4 text-lg text-orange-700">
            Que vous soyez lecteur passionné ou auteur en herbe, la plateforme
            est faite pour vous.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-20 grid gap-8 grid-cols-1 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-200 text-orange-600">
                <FontAwesomeIcon icon={step.icon} className="text-xl" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-orange-900">
                {step.title}
              </h3>
              <p className="mt-2 text-base text-orange-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <Link
            href="#demo"
            className="inline-flex items-center px-6 py-3 rounded-md bg-orange-600 text-white font-medium shadow-sm hover:bg-orange-700 transition-colors"
          >
            Voir comment ça marche
            <FontAwesomeIcon icon={faRocket} className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
