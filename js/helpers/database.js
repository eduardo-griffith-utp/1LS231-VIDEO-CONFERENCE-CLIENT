class DatabaseHelper {    
    static saveChat(chat){
        return true;
    }

    static getChats(roomCode) {
        // Paso 1: Crear y Devolver una Nueva Promesa
        return new Promise((resolve, reject) => {
            // Paso 2: Validar el Parámetro roomCode
            if (!roomCode) {
                reject(new Error("roomCode is undefined"));
                return;
            }

            // Paso 3: Referencia a la Base de Datos
            const databaseRef = firebase.database().ref('chats');

            // Paso 4: Recuperar los Chats de la Sala Específica
            databaseRef.orderByChild('room').equalTo(roomCode).once('value')
                .then((snapshot) => {
                    const chats = [];
                    // Paso 5: Procesar los Chats Recuperados
                    snapshot.forEach((childSnapshot) => {
                        const chat = childSnapshot.val();
                        chat.id = childSnapshot.key;
                        chats.push(chat);
                    });
                    resolve(chats);
                })
                .catch((error) => {
                    // Paso 6: Manejar Errores
                    console.error("Error getting chats:", error);
                    reject(error);
                });
        });
    }

    static addNote(note) {
        let promesa = new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref('notes');         
            const newNoteRef = databaseRef.push();    
            newNoteRef.set(note).then(() => {
                console.log(newNoteRef.key);
                resolve(newNoteRef.key);
            }).catch((error) => {
                reject(error);
            });
        });
        return promesa;
    }

    static editNote(note) {
        return true;
    }

    static deleteNote(idNote) {
        return true;
    }

    static getNotes(roomCode) {
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
}
