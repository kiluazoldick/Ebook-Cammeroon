"use client";

import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";

const excerpts = [
  {
    title: "Le Mystère du Lac Perdu",
    author: "Marie Tchoumi",
    excerpt:
      "Dans les profondeurs brumeuses du lac, une légende oubliée attend d'être révélée...",
  },
  {
    title: "Les Ailes de l’Espoir",
    author: "Jean Kouassi",
    excerpt:
      "Au cœur de la ville vibrante, une jeune fille découvre le pouvoir de ses rêves...",
  },
  {
    title: "Voyage au Bout du Temps",
    author: "Fatou Diop",
    excerpt:
      "Le temps s’étire et se plie quand le passé et le futur s’entrelacent dans une aventure incroyable...",
  },
];

const genres = [
  {
    name: "Aventure",
    description:
      "Partez à l’aventure avec des récits pleins de suspense et de rebondissements.",
  },
  {
    name: "Fantastique",
    description:
      "Explorez des mondes imaginaires où la magie et l’impossible prennent vie.",
  },
  {
    name: "Romance",
    description:
      "Vivez des histoires d’amour touchantes, passionnées et parfois inattendues.",
  },
  {
    name: "Science-fiction",
    description:
      "Plongez dans des univers futuristes pleins de technologies étonnantes et de mystères.",
  },
  {
    name: "Histoires vraies",
    description:
      "Découvrez des témoignages et récits authentiques qui inspirent et bouleversent.",
  },
];

export default function ExplorezLesHistoires() {
  return (
    <>
      <Head>
        <title>Explorez les histoires | eBook Cameroun</title>
        <meta
          name="description"
          content="Découvrez des extraits d’histoires captivantes sur eBook Cameroun et laissez-vous inspirer. Créez un compte pour accéder à toute la bibliothèque."
        />
      </Head>

      <div className="bg-orange-50 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow max-w-7xl mx-auto px-6 py-24">
          {/* Intro */}
          <section className="text-center max-w-4xl mx-auto mb-20">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-extrabold text-orange-800 leading-tight"
            >
              Explorez les histoires qui font vibrer l’Afrique
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg text-orange-700"
            >
              Plongez dans un univers riche en récits fascinants, découvrez les
              voix de nos auteurs africains et laissez-vous transporter par des
              aventures, des passions et des rêves. Le voyage commence ici.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10"
            >
              <Link
                href="/auth/connexion"
                className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-700 transition"
              >
                Créez votre compte gratuitement
              </Link>
            </motion.div>
          </section>

          {/* Extraits d’histoires */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">
              Un avant-goût de nos histoires
            </h2>
            <div className="grid gap-12 md:grid-cols-3">
              {excerpts.map(({ title, author, excerpt }, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.3, duration: 0.5 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-orange-200 flex flex-col justify-between"
                >
                  <h3 className="text-xl font-semibold text-orange-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-orange-700 italic flex-grow">{excerpt}</p>
                  <p className="mt-6 text-sm font-semibold text-orange-600">
                    — {author}
                  </p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Genres */}
          <section className="mb-24 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-orange-800 mb-10 text-center">
              Des genres pour tous les goûts
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {genres.map(({ name, description }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="bg-white rounded-xl shadow p-6 border border-orange-200"
                >
                  <h3 className="text-xl font-semibold text-orange-900 mb-3">
                    {name}
                  </h3>
                  <p className="text-orange-700">{description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Invitation à créer un compte */}
          <section className="bg-orange-600 rounded-xl p-12 max-w-4xl mx-auto text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Rejoignez la communauté d’auteurs et lecteurs
            </h2>
            <p className="mb-8 text-lg max-w-xl mx-auto">
              Créez un compte gratuit dès maintenant et débloquez l’accès
              complet à des milliers d’histoires inspirantes. Commencez à lire,
              écrire, et partager !
            </p>
            <Link
              href="/auth/connexion"
              className="inline-block bg-white text-orange-600 font-bold px-10 py-4 rounded-full shadow hover:bg-gray-100 transition"
            >
              Créer un compte gratuitement
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
