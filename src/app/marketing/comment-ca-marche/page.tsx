import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBookOpen,
  faPenFancy,
  faComments,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CommentCaMarche() {
  return (
    <>
      <Head>
        <title>Comment ça marche | eBook Cameroun</title>
        <meta
          name="description"
          content="Découvrez comment fonctionne eBook Cameroun : créez un compte, lisez, écrivez, échangez, et faites partie d'une communauté passionnée de lecture."
        />
      </Head>

      <div className="font-sans bg-gray-50 text-gray-800">
        <Navbar />
        <main className="pt-24 pb-16">
          <section className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl font-extrabold text-orange-700 text-center">
              Comment fonctionne eBook Cameroun ?
            </h1>
            <p className="mt-6 text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Vous êtes passionné de lecture ou vous avez des histoires plein la
              tête ? Sur eBook Cameroun, vous pouvez lire comme sur Spotify,
              publier comme sur Wattpad, et interagir comme sur un vrai réseau
              social littéraire. Voici comment :
            </p>
          </section>

          {/* Étape 1 */}
          <section className="mt-20 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-4">
              <FontAwesomeIcon icon={faUserPlus} size="2x" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-800">
                1. Créez votre compte gratuitement
              </h2>
              <p className="mt-3 text-gray-700">
                En quelques secondes, inscrivez-vous avec une adresse email ou
                votre compte Google. Vous choisissez votre rôle :{" "}
                <strong>lecteur</strong>, <strong>auteur</strong> ou les deux.
                Une fois inscrit, vous avez accès à un tableau de bord personnel
                pour suivre vos lectures, publier vos chapitres ou échanger avec
                la communauté.
              </p>
            </div>
          </section>

          {/* Étape 2 */}
          <section className="mt-16 max-w-5xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-4">
              <FontAwesomeIcon icon={faBookOpen} size="2x" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-800">
                2. Lisez des centaines d’histoires en streaming
              </h2>
              <p className="mt-3 text-gray-700">
                Découvrez une bibliothèque riche et variée : romans, nouvelles,
                poèmes, fiction africaine, science-fiction… Grâce à notre
                système de lecture en streaming, pas besoin de télécharger quoi
                que ce soit. Votre progression est sauvegardée automatiquement,
                vous pouvez reprendre à tout moment.
              </p>
              <p className="mt-2 text-gray-600 italic">
                « C’est comme Netflix, mais pour les livres ! »
              </p>
            </div>
          </section>

          {/* Étape 3 */}
          <section className="mt-16 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-4">
              <FontAwesomeIcon icon={faPenFancy} size="2x" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-800">
                3. Publiez vos propres histoires
              </h2>
              <p className="mt-3 text-gray-700">
                Vous rêvez de devenir auteur ? eBook Cameroun vous donne la
                scène. Rédigez et publiez vos chapitres directement depuis
                l’interface. Choisissez une couverture, ajoutez des genres,
                planifiez des publications. Les lecteurs peuvent commenter vos
                chapitres, s’abonner à votre profil et voter pour votre contenu.
              </p>
              <p className="mt-2 text-gray-600">
                Vous restez propriétaire de vos textes. Publiez à votre rythme,
                gratuitement.
              </p>
            </div>
          </section>

          {/* Étape 4 */}
          <section className="mt-16 max-w-5xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-4">
              <FontAwesomeIcon icon={faComments} size="2x" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-800">
                4. Échangez avec une vraie communauté
              </h2>
              <p className="mt-3 text-gray-700">
                eBook Cameroun n’est pas qu’une bibliothèque : c’est une
                plateforme sociale. Laissez des commentaires sous chaque
                chapitre, répondez aux auteurs, suivez vos coups de cœur,
                partagez des histoires à vos amis. C’est un espace vivant,
                bienveillant, et 100% littéraire.
              </p>
            </div>
          </section>

          {/* Étape 5 */}
          <section className="mt-16 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-4">
              <FontAwesomeIcon icon={faRocket} size="2x" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-800">
                5. Gagnez en visibilité et monétisez vos écrits
              </h2>
              <p className="mt-3 text-gray-700">
                Plus vos histoires sont lues, plus elles montent dans les
                classements. En tant qu’auteur, vous gagnez des badges, une
                réputation, et bientôt vous pourrez monétiser vos contenus via
                des abonnements premium ou des dons. L’objectif est de vous
                offrir une vraie opportunité d’épanouissement professionnel.
              </p>
            </div>
          </section>

          {/* Appel à l'action */}
          <section className="mt-24 bg-orange-600 py-12 text-white text-center px-6">
            <h2 className="text-3xl font-bold">
              Rejoignez l’expérience eBook Cameroun
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Que vous soyez lecteur ou auteur, débutant ou passionné, eBook
              Cameroun est fait pour vous. Créez un compte gratuitement et
              commencez à vivre votre aventure littéraire.
            </p>
            <Link
              href="/auth/connexion"
              className="mt-6 inline-block bg-white text-orange-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              Créer mon compte maintenant
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
