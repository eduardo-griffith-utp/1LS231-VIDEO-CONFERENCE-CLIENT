class DatabaseHelper {
  static saveChat(chat) {
    return true;
  }

  static getChats(roomCode) {
    return [
      {
        action: "chat",
        message: "XYZ",
        sender: {
          name: "John Doe",
          picture: "images/avatar.jpeg",
        },
      },
      {
        action: "file",
        file: "12345/test.txt",
        sender: {
          name: "John Doe",
          picture: "images/avatar.jpeg",
        },
      },
      {
        action: "chat",
        message: "XYZ",
        sender: {
          name: "John Doe",
          picture: "images/avatar.jpeg",
        },
      },
    ];
  }

    static addNote(note) {
        let promesa = new Promise((resolve, reject) => {
            
            const databaseRef = firebase.database().ref('notes');         
            const newNoteRef = databaseRef.push();    
       
            newNoteRef.set(note).then(() => {
                console.log(newNoteRef.key);
                resolve(newNoteRef.key);
            })
            .catch((error) => {
                reject(error);
            });
        });

        return promesa;
    }

  static editNote(note) {
    //  Crear y Devolver una Nueva Promesa
    return new Promise((resolve, reject) => {
      //  Obtener la Referencia de la Nota a Editar
      const noteRef = firebase.database().ref("notes").child(note.id);

      //  Actualizar la Nota en la Base de Datos
      noteRef
        .set(note)
        .then(() => {
          //  Resolver la Promesa
          resolve(true);
        })
        .catch((error) => {
          // Rechazar la Promesa en Caso de Error
          reject(error);
        });
    });
  }

  
  static deleteNote(idNote) {
    return true;
  }

  static getNotes(roomCode) {
    return [
      {
        sender: {
          name: "XYZ",
          picture: "images/avatar.jpeg",
        },
        content: {
          message: "XYZ",
          color: "#000",
        },
      },
      {
        sender: {
          name: "XYZ",
          picture: "images/avatar.jpeg",
        },
        content: {
          message: "XYZ",
          color: "#000",
        },
      },
    ];
  }
}
