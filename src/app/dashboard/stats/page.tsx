export default function StatPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Statistiques
          </h1>
          <p className="text-gray-600">
            Suivez votre progression et vos performances
          </p>
        </div>

        {/* Résumé des statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-2">
            <p className="text-sm text-gray-500">📝 Notes prises</p>
            <p className="text-3xl font-bold text-indigo-600">12</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-2">
            <p className="text-sm text-gray-500">📄 Résumés générés</p>
            <p className="text-3xl font-bold text-indigo-600">5</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-2">
            <p className="text-sm text-gray-500">🧠 Quiz complétés</p>
            <p className="text-3xl font-bold text-indigo-600">8</p>
          </div>
        </div>

        {/* Historique ou graphe simplifié */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Progression récente
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">Lundi</p>
              <p className="text-lg font-bold text-indigo-600">1 quiz</p>
            </div>
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">Mardi</p>
              <p className="text-lg font-bold text-indigo-600">1 résumé</p>
            </div>
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">Mercredi</p>
              <p className="text-lg font-bold text-indigo-600">2 notes</p>
            </div>
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">Jeudi</p>
              <p className="text-lg font-bold text-indigo-600">1 quiz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
