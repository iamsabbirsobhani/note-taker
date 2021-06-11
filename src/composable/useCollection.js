import { projectFirestore } from "@/firebase/config.js";

const useCollection = () => {
  const addNote = (note) => {
    projectFirestore.collection("note").doc().set(note);
  };
  return { addNote }
};

export { useCollection };
