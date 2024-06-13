const App = {
  mode: "light",
  view: "files",

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
     // Inicializar el arreglo files con el resultado del llamado a getList de StorageHelper
    this.files =  StorageHelper.getFiles();

     // Inicializacion del arreglo notes con el resultado de getList de NotesHelper
     this.notes = NotesHelper.getList(this.room);


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
        
        case "file":
          self.files.push(json.file);
          self.chats.push(json);
          break;
        }
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
  );
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

      try{
        await DatabaseHelper.saveChat(chat);
        console.log("Chat enviado exitosamente.");
      } catch (error) {
        console.error("Error al enviar el chat:", error);
      }
  },

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



  toggleAudio() {
    ApiRTCHelper.toggleAudio();
  },
  toggleVideo() {
    ApiRTCHelper.toggleVideo();

  },

  async upload(file) {
    let path = `${this.room}/${file.name}`;
    let value = StorageHelper.upload(file, path, ()=>{} );
    if(value){
      let chat = {
        "action": "file",
        "file": path
      };
      await this.sendChat(chat);
    }
  },
  
  async editNote(jsonNote) {
    const editRes = NotesHelper.edit(jsonNote.id, jsonNote);

    if (editRes === true) {
       await this.sendChat({
        "action": "edit-note",
	      "note": jsonNote
       })
    }
  },

  async goHome(){
    this.leaveConversation(false)
  },

  async deleteNote(noteId) {
    const deleteRes = NotesHelper.delete(noteId);

    if (deleteRes === true) {
       await this.sendChat({
        "action": "delete-note",
        "id": noteId // id de la nota
       })
    }
  }
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
  this.files.forEach(async file => {
    await this.upload(file);
  });
};

firebase.initializeApp(CONFIG.Firebase);