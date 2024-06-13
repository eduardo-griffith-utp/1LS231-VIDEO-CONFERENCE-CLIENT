// Crear la clase CallActions
class CallActions {
    //agregar metodo toggle audio
        toggleAudio() { 
            ApiRTCHelper.toggleAudio();
            return ApiRTCHelper.toggleAudio();
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
    
    
    