import { useState, useEffect, Children } from "react";
import initFirebase from "../Handlers/firebaseHandler";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

initFirebase();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const useStorage = (file) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageref = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("files");
    storageref.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageref.getDownloadURL();
        collectionRef.add({ url, createdAt: timestamp() });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

const saveToCloudLink = async (file) =>{
  const storageref = projectStorage.ref();
  let path = 'user1/'+file.name
  const fileRef = storageref.child(path)
    const collectionRef = projectFirestore.collection("files");

    await fileRef.put(file);

    const url = await fileRef.getDownloadURL();
    console.log(url);
    return url;
    // storageref.put(file).on(
    //   "state_changed",
    //   (snap) => {
    //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //     setProgress(percentage);
    //   },
    //   (err) => {
    //     setError(err);
    //   },
    //   async () => {
    //     const url = await storageref.getDownloadURL();
    //     collectionRef.add({ url, createdAt: timestamp() });
    //     setUrl(url);
    //   }
    // );
}

const saveOcrFirebase = (data) => {
  const collectionRef = projectFirestore.collection("files");
  collectionRef.add({ data, createdAt: timestamp() });
};

export { useStorage, saveOcrFirebase,saveToCloudLink };
