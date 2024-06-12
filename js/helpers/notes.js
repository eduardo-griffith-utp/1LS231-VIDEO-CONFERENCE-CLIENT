
class NotesHelper {
    static add(note) {
        const newId = "12345";
        return newId;
    }
    
    static delete(noteId) {
        return true;
    }


    static getList(roomCode) {
        return DatabaseHelper.getNotes(roomCode);
    }

    static edit(noteId, note) {
      return DatabaseHelper.editNote(note);
    }
}