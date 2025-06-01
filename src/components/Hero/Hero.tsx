import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Texte */}
          <div className="mt-12 sm:mt-16 lg:mt-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-orange-900 leading-tight">
              <span className="block">Plongez dans</span>
              <span className="block text-orange-600">
                des histoires inoubliables
              </span>
            </h1>
            <p className="mt-4 max-w-md mx-auto sm:mx-0 text-lg text-orange-700 sm:text-xl md:max-w-lg">
              Explorez des milliers de récits captivants, écrits par des auteurs
              passionnés. Rejoignez une communauté de lecteurs et partagez vos
              propres histoires en toute liberté.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start space-x-4">
              <Link
                href="/auth/connexion"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-white shadow-md hover:bg-orange-50 transition"
              >
                Commencer à lire
              </Link>

              <Link
                href="#discover"
                className="inline-flex items-center justify-center px-8 py-3 border border-orange-600 text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition"
              >
                Explorer les histoires
              </Link>
            </div>
          </div>

          {/* Visuel */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:flex lg:items-center justify-center">
            <div className="relative w-full max-w-md rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/ebook-hero-visuel.png"
                alt="Capture d'écran de la plateforme"
                width={1920}
                height={720}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-orange-600 opacity-10 pointer-events-none rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
