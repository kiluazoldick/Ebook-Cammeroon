// app/components/Testimonial.tsx
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    name: "Fatou Mbengue",
    role: "Étudiante en Licence",
    imageSrc: "/images/Testimonial/Marie.jpg",
    quote:
      "Ebook Cameroun m'a aidée à trouver tous mes livres universitaires au même endroit. Une vraie révolution pour mes études !",
  },
  {
    name: "Jean-Pierre Tcham",
    role: "Enseignant",
    imageSrc: "/images/Testimonial/Sophie.jpg",
    quote:
      "Grâce à Ebook Cameroun, mes supports de cours sont accessibles partout, ce qui facilite grandement ma préparation.",
  },
  {
    name: "Amina Kouam",
    role: "Lycéenne",
    imageSrc: "/images/Testimonial/Thomas.jpg",
    quote:
      "J'adore la variété des ebooks disponibles, c'est devenu mon outil favori pour réviser efficacement.",
  },
];

export default function Testimonial() {
  return (
    <section className="bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-orange-600">
            Témoignages
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-orange-900 sm:text-4xl">
            Ce que disent nos utilisateurs
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map(({ name, role, imageSrc, quote }) => (
            <div
              key={name}
              className="bg-white p-8 rounded-lg shadow-md border border-orange-200 flex flex-col"
            >
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="text-orange-400 text-3xl mb-4"
              />
              <p className="text-orange-800 text-lg italic mb-6 flex-grow">
                {quote}
              </p>
              <div className="flex items-center mt-auto">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-orange-300"
                />
                <div className="ml-4">
                  <p className="text-orange-900 font-semibold">{name}</p>
                  <p className="text-orange-700 text-sm">{role}</p>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faQuoteRight}
                className="text-orange-400 text-3xl mt-4 ml-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
