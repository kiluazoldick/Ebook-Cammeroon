import Link from "next/link";

export default function Cta() {
  return (
    <div id="signup" className="bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Texte */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-orange-900 sm:text-4xl">
              Prêt à accéder à la meilleure bibliothèque numérique ?
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-orange-700">
              Essayez Ebook Cameroun gratuitement pendant 14 jours. Sans
              engagement.
            </p>
          </div>

          {/* Formulaire */}
          <div className="mt-8 lg:mt-0">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-orange-300 shadow-sm placeholder-orange-400 focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs rounded-md"
                placeholder="Votre email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  Essai gratuit
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-orange-700">
              En vous inscrivant, vous acceptez nos{" "}
              <Link
                href="#"
                className="text-orange-600 font-medium hover:text-orange-500"
              >
                Conditions d utilisation
              </Link>{" "}
              et notre{" "}
              <Link
                href="#"
                className="text-orange-600 font-medium hover:text-orange-500"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
