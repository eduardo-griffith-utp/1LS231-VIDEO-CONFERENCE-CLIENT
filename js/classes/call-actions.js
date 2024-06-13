// Crear la clase CallActions
class CallActions {
    //agregar metodo toggle audio
        toggleAudio() { 
            return Math.random() < 0.5;
        }
    //agregar metodo toggle video 
        toggleVideo() { 
            ApiRTCHelper.toggleVideo();
            return Math.random() < 0.5;
        }
    
    // agregar metodo leaveConversation que recibe un parámetro
        leaveConversation(param) {
    //generar alerta 
            alert("To be implemented");
        }
    }
    
    
    