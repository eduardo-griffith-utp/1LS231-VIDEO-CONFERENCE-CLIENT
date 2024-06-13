// Crear la clase CallActions
class CallActions {
    //agregar metodo toggle audio
        toggleAudio() {
            return Math.random() < 0.5;
        }
    //agregar metodo toggle video 
        toggleVideo() {
            return Math.random() < 0.5;
        }
    
    // Agregar método leaveConversation 
    leaveConversation(showAlert) {
        if (showAlert) {
            const confirmLeave = confirm("Estás seguro que deseas abandonar la conversacion?");
            if (!confirmLeave) return;
        }
        ApiRTCHelper.leave();
    }
}
    
    
    