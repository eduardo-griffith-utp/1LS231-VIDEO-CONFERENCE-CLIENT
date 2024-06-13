
var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
var random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];


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


document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    const text = document.querySelector("#user_input").value;
    const newNote = { text: text }; 

    
    const noteId = NotesHelper.add(newNote);

   
    createStickyNote(text, noteId);

    
    document.querySelector("#modal").style.display = "none";

    document.querySelector("#user_input").value = "";
  }
});

function createStickyNote(text, noteId) {
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("h1");
  let closeButton = document.createElement("i");

  note.className = "note";
  details.className = "details";
  noteText.textContent = text;
  closeButton.className = "fas fa-times";

  
  closeButton.addEventListener("click", () => {
    NotesHelper.delete(noteId); 
    note.remove(); 
  });

 
  details.appendChild(noteText);
  note.appendChild(details);
  note.appendChild(closeButton);

  
  applyRandomStyles(note);

  
  document.querySelector("#all_notes").appendChild(note);
}


function applyRandomStyles(note) {
  note.style.margin = random_margin[Math.floor(Math.random() * random_margin.length)];
  note.style.backgroundColor = random_colors[Math.floor(Math.random() * random_colors.length)];
  note.style.transform = random_degree[Math.floor(Math.random() * random_degree.length)];
}
