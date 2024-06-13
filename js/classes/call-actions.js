// Crear la clase CallActions
class CallActions {
    //agregar metodo toggle audio
        toggleAudio() { 
            ApiRTCHelper.toggleAudio();
            return ApiRTCHelper.toggleAudio();
        }
    //agregar metodo toggle video 
        toggleVideo() {
            return Math.random() < 0.5;
        }
    
    // agregar metodo leaveConversation que recibe un parámetro
        leaveConversation(param) {
    //generar alerta 
            alert("To be implemented");
        }
    }
    
    
    