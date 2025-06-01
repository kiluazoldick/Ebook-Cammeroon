// pages/quizz/page.tsx
export default function QuizzPage() {
  const themes = ["Réseaux", "Bases de données", "Programmation"]; // Données simulées

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Quiz</h1>
          <p className="text-gray-600">Testez vos connaissances par thème</p>
        </div>

        {/* Choix de thème */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <label className="block text-gray-700 font-medium">
            Choisissez un thème :
          </label>
          <select className="w-full p-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option disabled selected>
              -- Sélectionner un thème --
            </option>
            {themes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </select>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
            Générer une question
          </button>
        </div>

        {/* Question générée */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-6">
          <div>
            <p className="text-gray-800 font-semibold">
              ❓ Quelle est la couche du modèle OSI qui gère le routage ?
            </p>
          </div>

          {/* Choix de réponses */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" className="accent-indigo-600" />
              <span className="text-gray-700">Couche application</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" className="accent-indigo-600" />
              <span className="text-gray-700">Couche réseau</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" className="accent-indigo-600" />
              <span className="text-gray-700">Couche liaison</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" className="accent-indigo-600" />
              <span className="text-gray-700">Couche session</span>
            </label>
          </div>

          <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition">
            Valider la réponse
          </button>
        </div>

        {/* Résultat */}
        <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-xl text-center font-medium">
          ✅ Bonne réponse ! La couche réseau est correcte.
        </div>
      </div>
    </div>
  );
}
