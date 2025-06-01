import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faPenNib,
  faBookmark,
  faUsers,
  faStar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function Features() {
  const features = [
    {
      icon: faBookOpen,
      title: "Lecture immersive",
      description:
        "Plongez dans des récits captivants avec un lecteur optimisé pour le confort visuel, sur mobile ou ordinateur.",
    },
    {
      icon: faPenNib,
      title: "Écrivez vos histoires",
      description:
        "Publiez facilement vos propres histoires, chapitres après chapitres. Donnez vie à votre imagination.",
    },
    {
      icon: faBookmark,
      title: "Sauvegarde & favoris",
      description:
        "Ajoutez vos lectures à vos favoris et reprenez là où vous vous êtes arrêté, sans jamais perdre le fil.",
    },
    {
      icon: faUsers,
      title: "Communauté d’auteurs & lecteurs",
      description:
        "Rejoignez une communauté passionnée, suivez vos auteurs préférés et échangez via les commentaires.",
    },
    {
      icon: faStar,
      title: "Classements & recommandations",
      description:
        "Découvrez les histoires les plus populaires et recevez des suggestions personnalisées selon vos goûts.",
    },
    {
      icon: faSearch,
      title: "Recherche avancée",
      description:
        "Trouvez rapidement des livres par genre, auteur, ou mots-clés grâce à notre moteur de recherche intelligent.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-orange-600">
            Fonctionnalités
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-orange-900 sm:text-4xl">
            Une nouvelle façon de lire et d’écrire
          </p>
          <p className="mt-4 text-lg text-orange-700">
            Profitez d’une expérience de lecture moderne et connectée. Que vous
            soyez lecteur ou auteur, tout est pensé pour vous.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-20 grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                <FontAwesomeIcon icon={feature.icon} className="text-xl" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-orange-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-orange-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
