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

    static upload(file,path,progress_callback){

        return new Promise ((reject, resolve)=> {
            const storageRef = firebase.storage().ref(path);
            const uploadTask = storageRef.put(file); 
        
            
            uploadTask.then(() => { 
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => { 
                resolve(downloadURL); 
            });
            
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
                progress_callback(progress);
            });

            }).catch((error) => { 
                reject(error);
            });
        });
    }

    static download(path) {
        const storage = getStorage(app);
        const storageRef = ref(storage, path);
        getDownloadURL(storageRef)
          .then((url) => {
            return fetch(url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Request mal echo");
                }
                return response.blob();
              })
              .then((blob) => {
                const blobURL = URL.createObjectURL(blob);
                const link = document.createElement("a");
    
                link.href = blobURL;
                link.download = path.split("/").pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobURL);
              })
              .catch((error) => {
                console.log("Error bajando archivo", error);
              });
          })
          .catch((error) => {
            console.log("Error obteniendo archivo", error);
          });
      }
}
