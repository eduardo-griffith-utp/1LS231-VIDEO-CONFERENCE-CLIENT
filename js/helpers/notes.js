class NotesHelper {
  static add(note) {
    const newId = "12345";
    return newId;
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
