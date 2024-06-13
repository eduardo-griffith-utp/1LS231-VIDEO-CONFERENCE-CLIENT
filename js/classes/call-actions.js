// Crear la clase CallActions
class CallActions {
    //agregar metodo toggle audio
        toggleAudio() { 
            return Math.random() < 0.5;
        }
    //agregar metodo toggle video 
        toggleVideo() { 
            ApiRTCHelper.toggleVideo();
            return ApiRTCHelper.toggleVideo();
        }
    
    // Agregar método leaveConversation 
    async leaveConversation() {
        await ApiRTCHelper.leaveConversation();   
     }
}
    
    
    