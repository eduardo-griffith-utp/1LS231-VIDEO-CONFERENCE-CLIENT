
class NotesHelper {
    static add(note) {
        const newId = "12345";
        return newId;
    }
    
    static delete(noteId) {
        return true;
    }


    static getList(roomCode) {
        return [
            {
                "sender": {
                  "name": "XYZ",
                  "picture": "images/avatar.jpeg"
                },
                "content": {
                  "message": "XYZ",
                  "color": "#000"
                }
            },
            {
                "sender": {
                  "name": "XYZ",
                  "picture": "images/avatar.jpeg"
                },
                "content": {
                  "message": "XYZ",
                  "color": "#000"
                }
            }
        ];
    }

    static edit(noteId, note) {
        return true;
    }

}