const App = {
  mode: "light",
  view: "call",

  userName: null,
  room: null,
  roomName: null,

  video: true,
  audio: true,

  message: "",

  users: [],
  streamList: [],
  chats: [],
  files: [],
  notes: [],

  CallActions: new CallActions(),

  toggleMode() {
    if (this.mode == "light") {
      this.mode = "dark";
    } else {
      this.mode = "light";
    }
  },
  async accessRoom() {
    let self = this;
    this.room = this.roomName;
    this.roomName = null;

<<<<<<< HEAD
=======
     // Inicializacion del arreglo notes con el resultado de getList de NotesHelper
     this.notes = NotesHelper.getList(this.room);


>>>>>>> main
    await AblyHelper.connect(this.room, (message) => {
      console.log("Received a message in realtime: " + message.data);
      var json = JSON.parse(message.data);
      switch (json.action) {
        case "user":         
          if (
              json.streamId != ApiRTCHelper.localStream.publishedInConversations.get(this.room) &&
              !this.streamList.find(stream => stream.streamId == json.streamId)                        
          ) {
              this.streamList.push(json);
          }      
          break;        
        case "chat":
          self.chats.push(json);
          break;
<<<<<<< HEAD
      }
=======
        
        case "file":
          self.files.push(json.file);
          self.chats.push(json);
          break;
        }
>>>>>>> main
    });

    await ApiRTCHelper.connect(
      this.room,
      async (stream) => {              
          await AblyHelper.send({ 
              action: "user", 
              user: this.userName, 
              streamId: ApiRTCHelper.localStream.publishedInConversations.get(this.room) 
          });  
      },
      (stream) => {
          this.streamList = this.streamList.filter(x => x.streamId != stream.streamId);
      }
<<<<<<< HEAD
  );
=======
    );
>>>>>>> main
  },
  async sendMessage() {
    await this.sendChat({
        "action": "chat",
        "message": this.message,            
    });
    this.message = '';
  },

  async sendChat(chat) {
      chat.sender = {
          "name": this.userName,
          "picture": "images/avatar.jpeg"
      }
      await AblyHelper.send(chat);
  },
<<<<<<< HEAD
=======

  async leaveConversation(showAlert) {
    if (showAlert) {
        const confirmLeave = confirm("Estás seguro que deseas abandonar la conversacion?");
        if (!confirmLeave) return;
    }

    await this.CallActions.leaveConversation();
    this.files = [];
    this.chats = [];
    this.notes = [];
    this.room = null;
    this.userName = null;
},

>>>>>>> main
  toggleAudio() {
    ApiRTCHelper.toggleAudio();
  },
  toggleVideo() {
    ApiRTCHelper.toggleVideo();
  },
<<<<<<< HEAD
=======

  async editNote(jsonNote) {
    const editRes = NotesHelper.edit(jsonNote.id, jsonNote);

    if (editRes === true) {
       await this.sendChat({
        "action": "edit-note",
	      "note": jsonNote
       })
    }
  },

  async deleteNote(noteId) {
    const deleteRes = NotesHelper.delete(noteId);

    if (deleteRes === true) {
       await this.sendChat({
        "action": "delete-note",
        "id": noteId // id de la nota
       })
    }
  },

>>>>>>> main
};

document.addEventListener("alpine:init", () => {
  Alpine.data("App", () => (App));
});

window.ondragover = function (event) {
  event.preventDefault();
};

window.ondrop = async function (event) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  console.log(files);
};

firebase.initializeApp(CONFIG.Firebase);