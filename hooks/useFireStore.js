import { useEffect, useState } from "react";
import initFirebase from "../Handlers/firebaseHandler";
import firebase from "firebase/app";



initFirebase();
const projectFirestore = firebase.firestore();

const useFirestore = (collection) => {

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
