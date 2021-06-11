import { projectFirestore } from "@/firebase/config";

const deleteNote = () => {
  const remove = (id) => {
    projectFirestore.collection("note").doc(id).delete();
  };
  return { remove };
};

export { deleteNote };
