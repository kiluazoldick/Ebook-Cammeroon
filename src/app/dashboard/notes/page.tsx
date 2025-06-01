export default function NotesPage() {
  type Note = { title: string; content: string };
  const notes: Note[] = []; // Ici ce serait remplacé par les vraies données

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Titre de la page */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📓 Mes Notes
          </h1>
          <p className="text-gray-600">Prenez vos notes importantes ici</p>
        </div>

        {/* Formulaire de prise de note */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <input
            type="text"
            placeholder="Titre de la note"
            className="w-full text-lg font-semibold text-gray-900 placeholder-gray-400 bg-gray-100 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Contenu de la note..."
            rows={8}
            className="w-full text-gray-800 placeholder-gray-400 bg-gray-100 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
            Enregistrer la note
          </button>
        </div>

        {/* Liste des notes */}
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="bg-blue-100 border border-blue-300 text-blue-800 p-6 rounded-xl text-center">
              <p className="text-lg font-medium">
                🚫 Pas encore de notes prises
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Commencez à saisir votre première note ci-dessus !
              </p>
            </div>
          ) : (
            notes.map((note, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {note.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
