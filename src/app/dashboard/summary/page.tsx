export default function ResumePage() {
  const notes = [
    { title: "Chapitre 1 - Réseaux", content: "Contenu de la note 1" },
    { title: "Chapitre 2 - Bases de données", content: "Contenu de la note 2" },
  ]; // Liste simulée

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧠 Résumer une note
          </h1>
          <p className="text-gray-600">
            Choisissez une note à résumer automatiquement
          </p>
        </div>

        {/* Sélecteur de note */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <label className="block text-gray-700 font-medium">
            Sélectionnez une note :
          </label>
          <select className="w-full p-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option disabled selected>
              -- Choisir une note --
            </option>
            {notes.map((note, index) => (
              <option key={index} value={index}>
                {note.title}
              </option>
            ))}
          </select>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
            Générer le résumé
          </button>
        </div>

        {/* Résumé généré */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-3">
          <label className="block text-gray-700 font-medium">
            Résumé généré :
          </label>
          <textarea
            placeholder="Le résumé apparaîtra ici..."
            rows={10}
            className="w-full bg-gray-100 p-4 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
