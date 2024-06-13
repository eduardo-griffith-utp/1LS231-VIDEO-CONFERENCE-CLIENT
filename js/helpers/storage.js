class StorageHelper {
    
    static getFiles(path) {
        return new Promise((resolve, reject) => {
            // Obtener la Referencia del Almacenamiento
            const storageRef = firebase.storage().ref(path);

            // Listado de los Archivos en la Ubicación Específica
            storageRef.listAll()
                .then((res) => {
                    // Procesamiento de los Archivos Recuperados
                    const files = res.items.map(itemRef => itemRef.fullPath);
                    resolve(files); // Resuelve la promesa con los nombres de los archivos
                })
                .catch((error) => {
                    // Manejo de Errores
                    reject(error); // Rechaza la promesa con el error recibido
                });
        });
    }

    static upload(file, path, progress_callback) {
        
    }

    static download(path) {
       
    }
}
