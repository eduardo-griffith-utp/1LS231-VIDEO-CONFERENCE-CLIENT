class StorageHelper{
    static getFiles (path){
        return [
            `uploads/file1.txt`,
            `uploads/file2.jpg`,
            `uploads/file3.pdf`
        ];
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
        return "https://google.com";
    }
}

