import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faPenNib,
  faBookmark,
  faUsers,
  faStar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function Avantages() {
  const features = [
    {
      icon: faBookOpen,
      title: "Lecture immersive",
      description:
        "Profitez d’une expérience de lecture fluide, avec une interface pensée pour le confort visuel : thème sombre, réglage de la taille de police, et compatibilité mobile optimale. Vous pouvez même lire hors connexion.",
    },
    {
      icon: faPenNib,
      title: "Écrivez et publiez vos histoires",
      description:
        "Publiez vos textes à votre rythme. Grâce à notre éditeur intégré, vous pouvez rédiger, corriger, illustrer et diffuser vos œuvres chapitre par chapitre. Vous gardez la main sur vos contenus et vos droits d’auteur.",
    },
    {
      icon: faBookmark,
      title: "Sauvegardes intelligentes",
      description:
        "Votre progression est automatiquement enregistrée. Même après une déconnexion ou un changement d’appareil, vous reprenez exactement où vous vous étiez arrêté. Vous pouvez aussi marquer vos lectures favorites.",
    },
    {
      icon: faUsers,
      title: "Une vraie communauté littéraire",
      description:
        "Ici, on ne lit pas seul. Vous pouvez suivre vos auteurs préférés, commenter les chapitres, échanger avec d'autres lecteurs, participer à des concours, et même créer votre cercle de lecture.",
    },
    {
      icon: faStar,
      title: "Classements & recommandations",
      description:
        "Les histoires les plus lues, aimées et commentées montent dans les classements. L’algorithme vous suggère aussi des lectures selon vos préférences de genres, d’auteurs ou de style narratif.",
    },
    {
      icon: faSearch,
      title: "Recherche intelligente",
      description:
        "Trouvez rapidement ce que vous cherchez : par auteur, mot-clé, ambiance, genre littéraire ou popularité. Notre moteur de recherche est conçu pour valoriser aussi les auteurs émergents.",
    },
  ];

  return (
    <>
      <Head>
        <title>Avantages | eBook Cameroun</title>
        <meta
          name="description"
          content="Découvrez tous les avantages d'eBook Cameroun : une plateforme littéraire moderne pensée pour les lecteurs et auteurs africains."
        />
      </Head>

      <div className="font-sans bg-gray-50 text-gray-800">
        <Navbar />
        <main className="pt-20 pb-16">
          <section className="bg-white py-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h1 className="text-4xl font-extrabold text-orange-700">
                Pourquoi choisir eBook Cameroun ?
              </h1>
              <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
                Notre mission : rendre la lecture et l’écriture plus
                accessibles, plus modernes et plus connectées. Que vous soyez
                lecteur curieux ou auteur passionné, voici ce que vous offre
                notre plateforme.
              </p>
            </div>

            {/* Grille des avantages */}
            <div className="mt-20 max-w-7xl mx-auto grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-orange-50 rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-600 text-white mx-auto">
                    <FontAwesomeIcon icon={feature.icon} className="text-xl" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-orange-800">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-gray-600 text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Mise en contexte africaine */}
          <section className="bg-orange-100 py-20 mt-10">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-orange-800">
                Une plateforme pensée pour les talents africains
              </h2>
              <p className="mt-6 text-lg text-gray-700">
                eBook Cameroun n’est pas une simple bibliothèque numérique.
                C’est un espace de visibilité, d’expression et de valorisation
                de la littérature africaine. Nos auteurs viennent de tout le
                continent, et nos lecteurs aussi.
              </p>
              <p className="mt-4 text-gray-700">
                Que vous écriviez en français, en anglais, en créole ou en
                langue locale, vous avez votre place. Notre ambition est de
                créer un écosystème culturel où la parole est libre, partagée et
                célébrée.
              </p>
            </div>
          </section>

          {/* Appel à l'action final */}
          <section className="bg-orange-600 py-16 mt-10">
            <div className="max-w-4xl mx-auto text-center text-white px-4">
              <h2 className="text-3xl font-bold">
                Rejoignez une nouvelle génération de lecteurs et d’auteurs
              </h2>
              <p className="mt-4 text-lg">
                Inscrivez-vous gratuitement et commencez dès aujourd’hui à lire,
                écrire et partager vos passions littéraires sur eBook Cameroun.
              </p>
              <Link
                href="/auth/connexion"
                className="mt-6 inline-block bg-white text-orange-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                Créer mon compte gratuitement
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
