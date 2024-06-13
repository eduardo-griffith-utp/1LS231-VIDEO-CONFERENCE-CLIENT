
class NotesHelper {
  static add(note) {
      return DatabaseHelper.addNote(note) ;
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