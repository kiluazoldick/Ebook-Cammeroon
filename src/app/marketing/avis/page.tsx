"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const testimonials = [
  {
    name: "Fatou Mbengue",
    role: "Étudiante en Licence",
    imageSrc: "/images/Testimonial/Marie.jpg",
    quote:
      "Ebook Cameroun m'a aidée à trouver tous mes livres universitaires au même endroit. Une vraie révolution pour mes études !",
    rating: 5,
  },
  {
    name: "Jean-Pierre Tcham",
    role: "Enseignant",
    imageSrc: "/images/Testimonial/Sophie.jpg",
    quote:
      "Grâce à Ebook Cameroun, mes supports de cours sont accessibles partout, ce qui facilite grandement ma préparation.",
    rating: 4,
  },
  {
    name: "Amina Kouam",
    role: "Lycéenne",
    imageSrc: "/images/Testimonial/Thomas.jpg",
    quote:
      "J'adore la variété des ebooks disponibles, c'est devenu mon outil favori pour réviser efficacement.",
    rating: 5,
  },
];

export default function Avis() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Avis Clients | Ebook Cameroun</title>
        <meta
          name="description"
          content="Découvrez ce que pensent nos utilisateurs d'Ebook Cameroun. Avis réels d'étudiants, enseignants et passionnés de lecture."
        />
      </Head>
      <div className="bg-orange-50 text-gray-900">
        <Navbar />
        <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-orange-800">
              Ce que disent nos utilisateurs
            </h1>
            <p className="mt-4 text-lg text-orange-700 max-w-2xl mx-auto">
              Chaque jour, des centaines d&apos;étudiants, enseignants et
              lecteurs passionnés font confiance à Ebook Cameroun. Voici leurs
              témoignages.
            </p>
          </div>

          {/* Slider principal */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg border-l-8 border-orange-500 mb-20 max-w-3xl mx-auto text-center"
          >
            <p className="text-xl italic text-orange-800 mb-6 relative">
              “{testimonials[current].quote}”
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Image
                src={testimonials[current].imageSrc}
                alt={testimonials[current].name}
                width={56}
                height={56}
                className="rounded-full border-2 border-orange-400"
              />
              <div>
                <p className="font-semibold text-orange-900">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-orange-700">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
            <div className="mt-3 text-orange-500">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
              ))}
            </div>
          </motion.div>

          {/* Grid d’avis */}
          <section className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md border border-orange-200"
              >
                <p className="text-orange-700 italic mb-4">“{t.quote}”</p>
                <div className="flex items-center mt-4">
                  <Image
                    src={t.imageSrc}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-orange-300"
                  />
                  <div className="ml-4">
                    <p className="text-orange-900 font-semibold">{t.name}</p>
                    <p className="text-orange-600 text-sm">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 text-orange-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
                  ))}
                </div>
              </motion.div>
            ))}
          </section>

          {/* Appel à témoignage */}
          <section className="mt-24 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              Et vous ? Votre avis compte !
            </h2>
            <p className="text-gray-700 mb-6">
              Avez-vous déjà utilisé Ebook Cameroun ? Partagez votre expérience
              et aidez d&apos;autres lecteurs à découvrir notre plateforme.
            </p>
            <a
              href="mailto:contact@ebookcameroun.com"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-md shadow hover:bg-orange-700 transition"
            >
              Envoyer mon témoignage
            </a>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
