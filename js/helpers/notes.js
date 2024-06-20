class NotesHelper {
  static add(note) {
    return DatabaseHelper.addNote(note);
  }

  static delete(noteId) {
    return DatabaseHelper.deleteNote(noteId);
  }

  static getList(roomCode) {
    return DatabaseHelper.getNotes(roomCode);
  }

  static edit(note) {
    return DatabaseHelper.editNote(note);
  }
}
// salida de todas las notas
function notasExistentes(notes) {
  const containerPadre = getElementbyId("");
  notes.forEach((note) => {
    containerPadre.appendChild(note);
  });
}

